const Note = require('../models/notes-model')

createNote = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Bad request" });
  }
  let note = new Note({
    user: req.session.user,
    name: req.body.name.toLowerCase(),
    description: req.body.description,
    completed: req.body.completed
  })
  note.save(function (err) {
    if (err) {
      console.log("Failed to save item. Reason:", err)
      return res.status(500).json({ message: "Internal server error" })
    }
    return res.status(201).json(note);
  })
}

updateNote = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Bad request" });
  }
  let note = {
    user: req.session.user,
    name: req.body.name.toLowerCase(),
    description: req.body.description,
    completed: req.body.completed
  }
  Note.replaceOne({ "_id": req.params.id, "user": req.session.user }, note, function (err, response) {
    if (err) {
      console.log("Failed to edit item id:" + req.params.id + ". Reason:", err)
      return res.status(500).json({ message: "Internal server error" })
    }
    if (!response.nModified) {
      return res.status(404).json({ message: "not found" })
    }
    return res.status(200).json({ message: "success" });
  })
}

deleteNote = async (req, res) => {
  Note.deleteOne({ "_id": req.params.id, "user": req.session.user }, function (err) {
    if (err) {
      console.log("Failed to remove item id:" + req.params.id + ". Reason:", err)
      return res.status(500).json({ message: "Internal server error" })
    }
    return res.status(200).json({ message: "success" });
  })
}

getNoteById = async (req, res) => {
  res.send('NOT IMPLEMENTED: Get Note by ID');
}

getNotes = async (req, res) => {
  let query = { "user": req.session.user }
  Note.find(query, function (err, notes) {
    if (err) {
      console.log("Failed to find items. Reason:", err)
      return res.status(500).json({ message: "Internal server error" })
    }
    return res.status(200).json(notes);
  })
}

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  getNoteById,
}