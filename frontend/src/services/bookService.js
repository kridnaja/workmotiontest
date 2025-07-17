import prisma from '../lib/prisma.js';

class BookService {
  // ดึงรายการหนังสือทั้งหมดแบบ pagination และ search
  async getBooks(page = 1, limit = 10, search = '') {
    const skip = (page - 1) * limit;

    if (search) {
      // ใช้ RegEx search ด้วย MySQL REGEXP
      try {
        const books = await prisma.$queryRaw`
          SELECT * FROM Book
          WHERE title REGEXP ${search}
             OR author REGEXP ${search}
             OR description REGEXP ${search}
          ORDER BY createdAt DESC
          LIMIT ${limit} OFFSET ${skip}
        `;
        
        // นับจำนวนทั้งหมด
        const countResult = await prisma.$queryRaw`
          SELECT COUNT(*) as count FROM Book
          WHERE title REGEXP ${search}
             OR author REGEXP ${search}
             OR description REGEXP ${search}
        `;
        const total = Number(countResult[0].count);
        
        return {
          books,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        };
      } catch (regexError) {
        console.error('RegEx search error:', regexError);
        // ถ้า RegEx ไม่ถูกต้อง ให้ใช้ contains แทน
        return this.getBooksWithContains(page, limit, search);
      }
    } else {
      // ไม่มี search term ใช้ Prisma query ปกติ
      const books = await prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      
      const total = await prisma.book.count();
      
      return {
        books,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
  }

  // ดึงรายการหนังสือด้วย contains search (fallback)
  async getBooksWithContains(page = 1, limit = 10, search = '') {
    const skip = (page - 1) * limit;
    
    const where = {
      OR: [
        { title: { contains: search } },
        { author: { contains: search } },
        { description: { contains: search } }
      ]
    };
    
    const books = await prisma.book.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
    
    const total = await prisma.book.count({ where });
    
    return {
      books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // ดึงข้อมูลหนังสือตาม ID
  async getBookById(id) {
    return await prisma.book.findUnique({
      where: { id: parseInt(id) }
    });
  }

  // เพิ่มหนังสือใหม่
  async createBook(bookData) {
    const { title, author, description, publishedAt } = bookData;
    
    return await prisma.book.create({
      data: {
        title,
        author,
        description,
        publishedAt: publishedAt ? new Date(publishedAt) : null
      }
    });
  }

  // แก้ไขข้อมูลหนังสือ
  async updateBook(id, bookData) {
    const { title, author, description, publishedAt } = bookData;
    
    return await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        description,
        publishedAt: publishedAt ? new Date(publishedAt) : null
      }
    });
  }

  // ลบหนังสือ
  async deleteBook(id) {
    return await prisma.book.delete({
      where: { id: parseInt(id) }
    });
  }
}

export default new BookService(); 