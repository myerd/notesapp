const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Note', Note)