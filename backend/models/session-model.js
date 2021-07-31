const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Session = new Schema(
    {
        user: { type: String, index: true },
        token: String,
        ttl: Number
    },
    { timestamps: true },
)

module.exports = mongoose.model("Session", Session);