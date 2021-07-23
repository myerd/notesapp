const Note = require('../models/notes-model')

createNote = (req, res) => {
    res.send('NOT IMPLEMENTED: Create Note');
}

updateNote = async (req, res) => {
    res.send('NOT IMPLEMENTED: Update Note');
}

deleteNote = async (req, res) => {
    res.send('NOT IMPLEMENTED: Delete Note');
}

getNoteById = async (req, res) => {
    res.send('NOT IMPLEMENTED: Get Note by ID');
}

getNotes = async (req, res) => {
    res.send('NOT IMPLEMENTED: Get Notes');
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
    getNoteById,
}