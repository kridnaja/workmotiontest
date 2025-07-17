import bookController from '../../../../controllers/bookController.js';

// GET /api/books/[id] - ดึงข้อมูลหนังสือ
export async function GET(request, { params }) {
  return await bookController.getBookById(request, { params });
}

// PUT /api/books/[id] - แก้ไขข้อมูลหนังสือ
export async function PUT(request, { params }) {
  return await bookController.updateBook(request, { params });
}

// DELETE /api/books/[id] - ลบหนังสือ
export async function DELETE(request, { params }) {
  return await bookController.deleteBook(request, { params });
} 