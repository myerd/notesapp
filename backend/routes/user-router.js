const express = require('express')

const UserController = require('../controllers/user-controller')

const router = express.Router();

router.post('/register', UserController.register);
router.put('/user/:id', UserController.updateUser);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/user/:id', UserController.getUserById);
router.get('/users', UserController.getUsers);

module.exports = router;