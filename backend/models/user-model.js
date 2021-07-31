const mongoose = require("mongoose");
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, unique: true },
        password: String
    },
    { timestamps: true },
)

module.exports = mongoose.model("User", User);