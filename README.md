# 📚 Book Management System

ระบบจัดการหนังสือแบบ Full-Stack ที่พัฒนาด้วย Next.js (Frontend) และ Express.js (Backend) พร้อมฐานข้อมูล MySQL และ Prisma ORM

## 🚀 Features

### Frontend (Next.js)
- ✅ **แสดงรายการหนังสือในรูปแบบตาราง** พร้อม pagination
- ✅ **ระบบค้นหา** ด้วย RegEx และ fallback
- ✅ **เพิ่มหนังสือใหม่** พร้อม validation
- ✅ **แก้ไขหนังสือ** พร้อม validation
- ✅ **ลบหนังสือ** พร้อม confirmation
- ✅ **ดูรายละเอียดหนังสือ** ในรูปแบบ modal
- ✅ **Responsive Design** ใช้งานได้ทุกขนาดหน้าจอ

### Backend (Express.js)
- ✅ **RESTful APIs** พร้อม pagination และ search
- ✅ **Prisma ORM** สำหรับจัดการฐานข้อมูล
- ✅ **MySQL Database** สำหรับเก็บข้อมูล
- ✅ **Controllers & Services** แยกส่วนตาม best practices
- ✅ **Error Handling** และ validation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React Framework
- **Tailwind CSS** - Styling
- **React Hooks** - State Management

### Backend
- **Express.js** - Node.js Framework
- **Prisma ORM** - Database ORM
- **MySQL** - Database
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
workmotiontest/
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   └── app/
│   │       └── page.js      # Main Book Management Page
│   ├── package.json
│   └── README.md
├── backend/                  # Express.js Backend
│   ├── controllers/
│   │   └── bookController.js
│   ├── services/
│   │   └── bookService.js
│   ├── routes/
│   │   └── books.js
│   ├── lib/
│   │   └── prisma.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL Server
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd workmotiontest
```

### 2. Setup Database
1. สร้างฐานข้อมูล MySQL ชื่อ `testdb`
2. ตั้งค่า MySQL root password เป็น `1234`

### 3. Setup Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm start
```

### 4. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📋 API Endpoints

### Books
- `GET /api/books` - ดึงรายการหนังสือ (พร้อม pagination & search)
- `GET /api/books/:id` - ดึงข้อมูลหนังสือเฉพาะเล่ม
- `POST /api/books` - เพิ่มหนังสือใหม่
- `PUT /api/books/:id` - แก้ไขหนังสือ
- `DELETE /api/books/:id` - ลบหนังสือ

### Health Check
- `GET /health` - ตรวจสอบสถานะ server

## 🎯 Features Detail

### 1. แสดงรายละเอียดหนังสือในรูปแบบตาราง
- แสดงข้อมูล: ชื่อหนังสือ, ผู้เขียน, รายละเอียด, วันที่เผยแพร่
- Pagination: 10 รายการต่อหน้า
- Loading states และ error handling

### 2. สามารถเข้าดูข้อมูลหนังสือ
- ปุ่ม "ดูรายละเอียด" ในตาราง
- Modal แสดงข้อมูลครบถ้วน
- ข้อมูล: ชื่อ, ผู้เขียน, รายละเอียด, วันที่เผยแพร่, วันที่สร้าง, วันที่อัปเดต

### 3. มีฟอร์มเพิ่มหนังสือ
- ฟอร์มสำหรับกรอกข้อมูลหนังสือ
- Validation: ชื่อหนังสือและผู้เขียนห้ามว่าง
- ปุ่ม "เพิ่มหนังสือใหม่"

### 4. สามารถกด "edit" เพื่อแก้ไขหนังสือ
- ปุ่ม "แก้ไข" ในตาราง
- ฟอร์มแก้ไขพร้อมข้อมูลเดิม
- Validation และ error handling

### 5. สามารถกด "delete" เพื่อลบหนังสือ
- ปุ่ม "ลบ" ในตาราง
- Confirmation dialog ก่อนลบ
- Error handling

### 6. มีระบบ validate เบื้องต้น
- **Frontend**: ตรวจสอบข้อมูลที่จำเป็น
- **Backend**: Validation และ error responses
- แสดง alert เมื่อข้อมูลไม่ครบ

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Development mode with nodemon
```

### Frontend Development
```bash
cd frontend
npm run dev  # Development server
```

### Database Management
```bash
cd backend
npx prisma studio  # Open Prisma Studio
npx prisma db push  # Push schema changes
npx prisma generate  # Generate Prisma client
```

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="mysql://root:1234@localhost:3306/testdb"
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Book Management System - Full Stack Developer Test
