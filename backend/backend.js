require('dotenv').config()

const express = require("express");
const cors = require('cors');
const db = require('./db');
const notesRouter = require('./routes/notes-router');
const userRouter = require('./routes/user-router');
const sessionUtils = require('./utils/session-utils');

const app = express();
const apiPort = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api/n', sessionUtils.isUserLogged, notesRouter);
app.use('/api/user', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

app.use(express.json());