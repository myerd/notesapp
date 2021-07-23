const express = require('express')

const NotesController = require('../controllers/notes-controller')

const router = express.Router();

router.post('/note', NotesController.createNote);
router.put('/note/:id', NotesController.updateNote);
router.delete('/note/:id', NotesController.deleteNote);
router.get('/note/:id', NotesController.getNoteById);
router.get('/note', NotesController.getNotes);

module.exports = router;