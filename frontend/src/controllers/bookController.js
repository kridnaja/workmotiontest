import { NextResponse } from 'next/server';
import bookService from '../services/bookService.js';

class BookController {
  // GET /api/books - ดึงรายการหนังสือทั้งหมด
  async getBooks(request) {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = parseInt(searchParams.get('limit')) || 10;
      const search = searchParams.get('search') || '';

      const result = await bookService.getBooks(page, limit, search);
      
      return NextResponse.json(result);
    } catch (error) {
      console.error('Error fetching books:', error);
      
      // ตรวจสอบ error type
      if (error.code === 'P1001') {
        return NextResponse.json(
          { error: 'Database connection failed' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch books', details: error.message },
        { status: 500 }
      );
    }
  }

  // POST /api/books - เพิ่มหนังสือใหม่
  async createBook(request) {
    try {
      const body = await request.json();
      const { title, author, description, publishedAt } = body;

      // Validation
      if (!title || !author) {
        return NextResponse.json(
          { error: 'Title and author are required' },
          { status: 400 }
        );
      }

      const book = await bookService.createBook({
        title,
        author,
        description,
        publishedAt
      });

      return NextResponse.json(book, { status: 201 });
    } catch (error) {
      console.error('Error creating book:', error);
      
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Book already exists' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to create book', details: error.message },
        { status: 500 }
      );
    }
  }

  // GET /api/books/[id] - ดึงข้อมูลหนังสือ
  async getBookById(request, { params }) {
    try {
      const { id } = params;
      const book = await bookService.getBookById(id);

      if (!book) {
        return NextResponse.json(
          { error: 'Book not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      
      if (error.code === 'P1001') {
        return NextResponse.json(
          { error: 'Database connection failed' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch book', details: error.message },
        { status: 500 }
      );
    }
  }

  // PUT /api/books/[id] - แก้ไขข้อมูลหนังสือ
  async updateBook(request, { params }) {
    try {
      const { id } = params;
      const body = await request.json();
      const { title, author, description, publishedAt } = body;

      // Validation
      if (!title || !author) {
        return NextResponse.json(
          { error: 'Title and author are required' },
          { status: 400 }
        );
      }

      const book = await bookService.updateBook(id, {
        title,
        author,
        description,
        publishedAt
      });

      return NextResponse.json(book);
    } catch (error) {
      console.error('Error updating book:', error);
      
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Book not found' },
          { status: 404 }
        );
      }
      
      if (error.code === 'P1001') {
        return NextResponse.json(
          { error: 'Database connection failed' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to update book', details: error.message },
        { status: 500 }
      );
    }
  }

  // DELETE /api/books/[id] - ลบหนังสือ
  async deleteBook(request, { params }) {
    try {
      const { id } = params;
      
      await bookService.deleteBook(id);

      return NextResponse.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Book not found' },
          { status: 404 }
        );
      }
      
      if (error.code === 'P1001') {
        return NextResponse.json(
          { error: 'Database connection failed' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to delete book', details: error.message },
        { status: 500 }
      );
    }
  }
}

export default new BookController(); 