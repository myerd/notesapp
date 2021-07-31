const express = require('express')

const UserController = require('../controllers/user-controller')

const router = express.Router();

router.post('/register', UserController.register);
router.put('/:id', UserController.updateUser);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getUsers);

module.exports = router;