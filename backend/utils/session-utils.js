const crypto = require('crypto');
const Session = require('../models/session-model');

const time_to_live_diff = 3600000;

createToken = () => {
    let token = crypto.randomBytes(128);
    return token.toString("hex");
}

isUserLogged = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(403).json({ message: "forbidden" });
    }
    Session.findOne({ "token": req.headers.token }, function (err, session) {
        if (err) {
            console.log("Failed to find session. Reason:", err);
            return res.status(403).json({ message: "forbidden" });
        }
        if (!session) {
            return res.status(403).json({ message: "forbidden" });
        }
        let now = Date.now();
        if (now > session.ttl) {
            Session.deleteOne({ "_id": session._id }, function (err) {
                if (err) {
                    console.log("Failed to remove expired session. Reason:", err)
                }
                return res.status(403).json({ message: "forbidden" });
            })
        } else {
            req.session = {};
            req.session.user = session.user;
            session.ttl = now + time_to_live_diff;
            session.save(function (err) {
                if (err) {
                    console.log("Failed to resave session. Reason:", err);
                }
                return next();
            })
        }
    })
}

module.exports = {
    isUserLogged,
    createToken,
    time_to_live_diff
}