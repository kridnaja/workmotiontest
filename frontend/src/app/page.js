'use client';

import { useState, useEffect } from 'react';

// Backend API URL
const API_BASE_URL = 'http://localhost:5000/api';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedAt: ''
  });

  // ดึงข้อมูลหนังสือ
  const fetchBooks = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search: search
      });
      
      const response = await fetch(`${API_BASE_URL}/books?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setBooks(data.books);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.page);
      } else {
        console.error('Failed to fetch books:', data.error);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // เพิ่มหนังสือใหม่
  const addBook = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author) {
      alert('กรุณากรอกชื่อหนังสือและผู้เขียน');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', author: '', description: '', publishedAt: '' });
        setShowForm(false);
        fetchBooks(currentPage, searchTerm);
      } else {
        const data = await response.json();
        alert(data.error || 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มหนังสือ');
    }
  };

  // แก้ไขหนังสือ
  const updateBook = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author) {
      alert('กรุณากรอกชื่อหนังสือและผู้เขียน');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/books/${editingBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', author: '', description: '', publishedAt: '' });
        setEditingBook(null);
        setShowForm(false);
        fetchBooks(currentPage, searchTerm);
      } else {
        const data = await response.json();
        alert(data.error || 'เกิดข้อผิดพลาดในการแก้ไขหนังสือ');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      alert('เกิดข้อผิดพลาดในการแก้ไขหนังสือ');
    }
  };

  // ลบหนังสือ
  const deleteBook = async (id) => {
    if (!confirm('คุณต้องการลบหนังสือเล่มนี้หรือไม่?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBooks(currentPage, searchTerm);
      } else {
        const data = await response.json();
        alert(data.error || 'เกิดข้อผิดพลาดในการลบหนังสือ');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('เกิดข้อผิดพลาดในการลบหนังสือ');
    }
  };

  // เริ่มแก้ไขหนังสือ
  const startEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description || '',
      publishedAt: book.publishedAt ? book.publishedAt.split('T')[0] : ''
    });
    setShowForm(true);
  };

  // ยกเลิกการแก้ไข
  const cancelEdit = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '', description: '', publishedAt: '' });
    setShowForm(false);
  };

  // ดูรายละเอียดหนังสือ
  const viewBook = (book) => {
    setViewingBook(book);
  };

  // ปิด modal รายละเอียด
  const closeViewModal = () => {
    setViewingBook(null);
  };

  // ค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks(1, searchTerm);
  };

  // เปลี่ยนหน้า
  const changePage = (page) => {
    setCurrentPage(page);
    fetchBooks(page, searchTerm);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ระบบจัดการหนังสือ (Book Management)
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="ค้นหาหนังสือ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* Add Book Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            เพิ่มหนังสือใหม่
          </button>
        </div>

        {/* Book Form */}
        {showForm && (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingBook ? 'แก้ไขหนังสือ' : 'เพิ่มหนังสือใหม่'}
            </h2>
            <form onSubmit={editingBook ? updateBook : addBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อหนังสือ *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ผู้เขียน *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รายละเอียด
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  วันที่เผยแพร่
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editingBook ? 'อัปเดต' : 'เพิ่ม'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Books Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ชื่อหนังสือ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ผู้เขียน
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      รายละเอียด
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่เผยแพร่
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      การดำเนินการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.author}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {book.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.publishedAt ? new Date(book.publishedAt).toLocaleDateString('th-TH') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewBook(book)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          ดูรายละเอียด
                        </button>
                        <button
                          onClick={() => startEdit(book)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => deleteBook(book.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {books.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  ไม่พบข้อมูลหนังสือ
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex space-x-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ก่อนหน้า
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป
              </button>
            </nav>
          </div>
        )}

        {/* Book Details Modal */}
        {viewingBook && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">รายละเอียดหนังสือ</h2>
                <button
                  onClick={closeViewModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อหนังสือ</label>
                  <p className="text-gray-900 font-medium">{viewingBook.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ผู้เขียน</label>
                  <p className="text-gray-900">{viewingBook.author}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                  <p className="text-gray-900">{viewingBook.description || 'ไม่มีรายละเอียด'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">วันที่เผยแพร่</label>
                  <p className="text-gray-900">
                    {viewingBook.publishedAt 
                      ? new Date(viewingBook.publishedAt).toLocaleDateString('th-TH')
                      : 'ไม่ระบุวันที่'
                    }
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">วันที่สร้าง</label>
                  <p className="text-gray-900">
                    {new Date(viewingBook.createdAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">วันที่อัปเดตล่าสุด</label>
                  <p className="text-gray-900">
                    {new Date(viewingBook.updatedAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
