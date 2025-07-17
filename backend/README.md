# Book Management Backend API

Backend API สำหรับระบบจัดการหนังสือที่พัฒนาด้วย Express.js, Prisma ORM และ MySQL

## คุณสมบัติ

### RESTful API Endpoints
- ✅ GET `/api/books` - ดึงรายการหนังสือทั้งหมดแบบ pagination
- ✅ GET `/api/books/:id` - ดึงข้อมูลหนังสือ
- ✅ POST `/api/books` - เพิ่มหนังสือใหม่
- ✅ PUT `/api/books/:id` - แก้ไขข้อมูลหนังสือ
- ✅ DELETE `/api/books/:id` - ลบหนังสือ
- ✅ ระบบค้นหาด้วย RegEx (MySQL REGEXP)
- ✅ แยก Controllers และ Services ตาม Best Practice

### Database
- ✅ MySQL + Prisma ORM
- ✅ Migration และ Schema Management
- ✅ Connection pooling และ error handling

## การติดตั้ง

### 1. ติดตั้ง Dependencies
```bash
cd backend
npm install
```

### 2. ตั้งค่า Database
```bash
# สร้าง Prisma client
npx prisma generate

# สร้างและ migrate database
npx prisma migrate dev --name init
```

### 3. รัน Development Server
```bash
npm run dev
```

Server จะรันที่ `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | ดึงรายการหนังสือทั้งหมด (รองรับ pagination และ RegEx search) |
| POST | `/api/books` | เพิ่มหนังสือใหม่ |
| GET | `/api/books/:id` | ดึงข้อมูลหนังสือตาม ID |
| PUT | `/api/books/:id` | แก้ไขข้อมูลหนังสือ |
| DELETE | `/api/books/:id` | ลบหนังสือ |

### Query Parameters สำหรับ GET /api/books
- `page`: หมายเลขหน้า (default: 1)
- `limit`: จำนวนรายการต่อหน้า (default: 10)
- `search`: คำค้นหา RegEx (optional)

### ตัวอย่าง Request/Response

#### GET /api/books
```bash
curl "http://localhost:5000/api/books?page=1&limit=10&search=^Harry"
```

Response:
```json
{
  "books": [
    {
      "id": 1,
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "description": "The first book in the Harry Potter series",
      "publishedAt": "1997-06-26T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### POST /api/books
```bash
curl -X POST "http://localhost:5000/api/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "description": "Epic fantasy novel",
    "publishedAt": "1954-07-29"
  }'
```

## โครงสร้างโปรเจค

```
backend/
├── controllers/
│   └── bookController.js     # HTTP Request/Response handling
├── services/
│   └── bookService.js        # Business Logic
├── routes/
│   └── books.js             # Express routes
├── prisma/
│   ├── schema.prisma        # Database Schema
│   └── migrations/          # Database Migrations
├── server.js                # Express server
├── package.json
└── README.md
```

## Architecture Pattern

### MVC Pattern (Model-View-Controller)
- **Model**: Prisma Schema และ Database
- **View**: Frontend (React/Next.js)
- **Controller**: `controllers/bookController.js`
- **Service**: `services/bookService.js`

### Layer Separation
1. **Routes** (`routes/`) - HTTP endpoints
2. **Controllers** (`controllers/`) - Request/Response handling
3. **Services** (`services/`) - Business logic
4. **Database** (Prisma + MySQL) - Data persistence

## เทคโนโลยีที่ใช้

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Search**: MySQL REGEXP (Regular Expression)
- **Architecture**: MVC Pattern with Controllers/Services

## การ Deploy

### Heroku
1. สร้าง Heroku app
2. ตั้งค่า Environment Variables
3. Deploy: `git push heroku main`

### Railway
1. เชื่อมต่อ GitHub repository
2. ตั้งค่า Environment Variables
3. Deploy อัตโนมัติ

### DigitalOcean
1. สร้าง Droplet
2. ติดตั้ง Node.js และ MySQL
3. Deploy application

## Environment Variables

สร้างไฟล์ `.env`:
```env
PORT=5000
DATABASE_URL="mysql://root:@localhost:3306/testdb"
NODE_ENV=development
```

## License

MIT License 