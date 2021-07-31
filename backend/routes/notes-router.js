const express = require('express')

const NotesController = require('../controllers/notes-controller')

const router = express.Router();

router.post('/', NotesController.createNote);
router.put('/:id', NotesController.updateNote);
router.delete('/:id', NotesController.deleteNote);
router.get('/:id', NotesController.getNoteById);
router.get('/', NotesController.getNotes);

module.exports = router;