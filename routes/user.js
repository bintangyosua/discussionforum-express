const express = require('express');
const router = express.Router();
const db = require('../config/database');
const userControllers = require('../controllers/userControllers');


// Route untuk menambah user baru
router.post('/users', userControllers.createUser);

// Route untuk mendapatkan semua data user
router.get('/users', userControllers.getAllUsers);

// Route untuk mendapatkan data user berdasarkan id
router.get('/users/:id', userControllers.getUserById);

// Route untuk memperbarui data user berdasarkan id
router.put('/users/:id', userControllers.updateUserById)

// Route untuk menghapus user
router.delete('/users/:id', userControllers.deleteUserById);

 
module.exports = router;