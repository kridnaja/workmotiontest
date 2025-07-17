const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /api/books - ดึงรายการหนังสือทั้งหมดแบบ pagination
router.get('/', bookController.getBooks);

// POST /api/books - เพิ่มหนังสือใหม่
router.post('/', bookController.createBook);

// GET /api/books/:id - ดึงข้อมูลหนังสือ
router.get('/:id', bookController.getBookById);

// PUT /api/books/:id - แก้ไขข้อมูลหนังสือ
router.put('/:id', bookController.updateBook);

// DELETE /api/books/:id - ลบหนังสือ
router.delete('/:id', bookController.deleteBook);

module.exports = router; 