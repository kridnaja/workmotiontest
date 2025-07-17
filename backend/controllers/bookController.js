const bookService = require('../services/bookService');

class BookController {
  // GET /api/books - ดึงรายการหนังสือทั้งหมด
  async getBooks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      const result = await bookService.getBooks(page, limit, search);
      
      res.json(result);
    } catch (error) {
      console.error('Error fetching books:', error);
      
      // ตรวจสอบ error type
      if (error.code === 'P1001') {
        return res.status(500).json({
          error: 'Database connection failed'
        });
      }
      
      res.status(500).json({
        error: 'Failed to fetch books',
        details: error.message
      });
    }
  }

  // POST /api/books - เพิ่มหนังสือใหม่
  async createBook(req, res) {
    try {
      const { title, author, description, publishedAt } = req.body;

      // Validation
      if (!title || !author) {
        return res.status(400).json({
          error: 'Title and author are required'
        });
      }

      const book = await bookService.createBook({
        title,
        author,
        description,
        publishedAt
      });

      res.status(201).json(book);
    } catch (error) {
      console.error('Error creating book:', error);
      
      if (error.code === 'P2002') {
        return res.status(400).json({
          error: 'Book already exists'
        });
      }
      
      res.status(500).json({
        error: 'Failed to create book',
        details: error.message
      });
    }
  }

  // GET /api/books/:id - ดึงข้อมูลหนังสือ
  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id);

      if (!book) {
        return res.status(404).json({
          error: 'Book not found'
        });
      }

      res.json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      
      if (error.code === 'P1001') {
        return res.status(500).json({
          error: 'Database connection failed'
        });
      }
      
      res.status(500).json({
        error: 'Failed to fetch book',
        details: error.message
      });
    }
  }

  // PUT /api/books/:id - แก้ไขข้อมูลหนังสือ
  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author, description, publishedAt } = req.body;

      // Validation
      if (!title || !author) {
        return res.status(400).json({
          error: 'Title and author are required'
        });
      }

      const book = await bookService.updateBook(id, {
        title,
        author,
        description,
        publishedAt
      });

      res.json(book);
    } catch (error) {
      console.error('Error updating book:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Book not found'
        });
      }
      
      if (error.code === 'P1001') {
        return res.status(500).json({
          error: 'Database connection failed'
        });
      }
      
      res.status(500).json({
        error: 'Failed to update book',
        details: error.message
      });
    }
  }

  // DELETE /api/books/:id - ลบหนังสือ
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      
      await bookService.deleteBook(id);

      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Book not found'
        });
      }
      
      if (error.code === 'P1001') {
        return res.status(500).json({
          error: 'Database connection failed'
        });
      }
      
      res.status(500).json({
        error: 'Failed to delete book',
        details: error.message
      });
    }
  }
}

module.exports = new BookController(); 