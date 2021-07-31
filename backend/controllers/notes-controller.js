const Note = require('../models/notes-model')

createNote = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Bad request" });
    }
    if (!req.body.type) {
        return res.status(400).json({ message: "Bad request" });
    }
    let note = new noteModel({
        user: req.session.user,
        name: req.body.name.toLowerCase(),
        count: req.body.description,
        price: req.body.price
    })
    item.save(function (err) {
        if (err) {
            console.log("Failed to save item. Reason:", err)
            return res.status(500).json({ message: "Internal server error" })
        }
        return res.status(201).json({ message: "success!" });
    })
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
    let query = { "user": req.session.user };
    if (req.query.type) {
        query["type"] = req.query.type.toLowerCase();
    }
    if (req.query.price) {
        query["price"] = { $lte: req.query.price }
    }
    itemModel.find(query, function (err, items) {
        if (err) {
            console.log("Failed to find items. Reason:", err)
            return res.status(500).json({ message: "Internal server error" })
        }
        return res.status(200).json(items);
    })
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
    getNoteById,
}