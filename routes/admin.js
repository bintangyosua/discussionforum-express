const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');


// Route untuk menambah admin baru
router.post('/admins', adminControllers.createAdmin);

// Route untuk mendapatkan semua data admin
router.get('/admins', adminControllers.getAllAdmins);

// Route untuk mendapatkan data admin berdasarkan id
router.get('/admins/:id', adminControllers.getAdminById);

// Route untuk memperbarui data admin berdasarkan id
router.put('/admins/:id', adminControllers.updateAdminById)

// Route untuk menghapus admin
router.delete('/admins/:id', adminControllers.deleteAdminById);

 
module.exports = router;