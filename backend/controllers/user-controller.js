const User = require('../models/user-model');
const Session = require('../models/session-model');
const sessionUtils = require('../utils/session-utils');

const bcrypt = require('bcrypt');

register = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Bad Request 1" });
    }
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Bad Request 2" });
    }
    if (req.body.username.length < 4 || req.body.password.length < 8) {
        return res.status(400).json({ message: "Bad Request 3" });
    }
    bcrypt.hash(req.body.password, 14, function (err, hash) {
        if (err) {
            return res.status(400).json({ message: "Bad request 4" });
        }
        let user = new User({
            username: req.body.username,
            password: hash
        });
        user.save(function (err, user) {
            if (err) {
                console.log("Failed to register new user. Reason:" + err)
                if (err.code === 11000) {
                    return res.status(409).json({ message: "Username is already in use" })
                }
                return res.status(500).json({ message: "Internal server error" });
            }
            if (!user) {
                return res.status(500).json({ message: "Internal server error" });
            }
            return res.status(201).json({ message: "User registered" });
        })
    })
}

updateUser = async (req, res) => {
    res.send('NOT IMPLEMENTED: Update User');
}

login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Bad Request 1" });
    }
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Bad Request 2" });
    }
    if (req.body.username.length < 4 || req.body.password.length < 8) {
        return res.status(400).json({ message: "Bad Request 3" });
    }
    User.findOne({ "username": req.body.username }, function (err, user) {
        if (err) {
            console.log("Failed in finding user. Reason:" + err)
            return res.status(500).json({ message: "Internal server error" })
        }
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        bcrypt.compare(req.body.password, user.password, function (err, success) {
            if (err) {
                console.log("Comparing passwords failed. Reason:", err)
                return res.status(500).json({ message: "Internal server error" })
            }
            if (!success) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            let token = sessionUtils.createToken();
            let now = Date.now();
            let session = new Session({
                user: user.username,
                ttl: now + sessionUtils.time_to_live_diff,
                token: token
            })
            session.save(function (err) {
                if (err) {
                    console.log("Saving session failed. Reason:", err)
                    return res.status(500).json({ message: "Internal server error" })
                }
                return res.status(200).json({ "token": token })
            })
        })
    })
}

logout = async (req, res) => {
    if (!req.headers.token) {
        return res.status(404).json({ message: "not found" });
    }
    Session.deleteOne({ "token": req.headers.token }, function (err) {
        if (err) {
            console.log("Failed to remove session in logout. Reason:", err)
        }
        return res.status(200).json({ message: "logged out!" });
    })
}

getUserById = async (req, res) => {
    res.send('NOT IMPLEMENTED: Get User');
}

getUsers = async (req, res) => {
    res.send('NOT IMPLEMENTED: Get Users');
}

module.exports = {
    register,
    updateUser,
    login,
    logout,
    getUsers,
    getUserById,
}