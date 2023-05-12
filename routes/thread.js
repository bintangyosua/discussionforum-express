const express = require('express');
const router = express.Router();
const threadControllers = require('../controllers/threadControllers');


// Router untuk menambah thread baru
router.post('/threads', threadControllers.createThread);

// Router untuk mendapatkan semua thread
router.get('/threads', threadControllers.getAllThreads);

// Router untuk mendapatkan threaad dengan id
router.get('/threads/:id', threadControllers.getThreadById);

// Router untuk mengubah thread dengan id
router.put('/threads/:id', threadControllers.updateThreadById);

// Router untuk menghapus thread dengan id
router.delete('/threads/:id', threadControllers.deleteThreadById);

module.exports = router;