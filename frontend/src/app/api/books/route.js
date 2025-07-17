import bookController from '../../../controllers/bookController.js';

// GET /api/books - ดึงรายการหนังสือทั้งหมดแบบ pagination
export async function GET(request) {
  return await bookController.getBooks(request);
}

// POST /api/books - เพิ่มหนังสือใหม่
export async function POST(request) {
  return await bookController.createBook(request);
} 