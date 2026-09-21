import { useState, useEffect } from 'react';
import './App.css';
import { bookService, type Book } from './services/bookService';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError('Không thể kết nối đến máy chủ Backend!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    try {
      const newBook = await bookService.create({ title, author });
      setBooks((prev) => [...prev, newBook]);
      setTitle('');
      setAuthor('');
    } catch (err) {
      console.error(err);
      alert('tạo sách thất bại');
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await bookService.remove(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.error(err);
      alert('Xóa sách thất bại!');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Hệ thống quản lí thư viện</h1>
        <p>Theo dõi và quản lí danh mục sách</p>
      </header>

      <section className="card">
        <h3>Thêm sách mới</h3>
        <form className="book-form" onSubmit={handleCreateBook}>
          <input
            type="text"
            placeholder="Tên cuốn sách..."
            className="input-text flex-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tên tác giả..."
            className="input-text flex-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Lưu sách
          </button>
        </form>
      </section>

      <section className="card">
        <h3>Danh sách hiện có</h3>

        {error && (
          <p style={{ color: '#ef4444', marginBottom: '12px' }}>{error}</p>
        )}
        {loading ? (
          <p>Đang tải dữ liệu từ database...</p>
        ) : books.length === 0 ? (
          <p>Chưa có cuốn sách nào trong kho.</p>
        ) : (
          <table className="book-table">
            <thead>
              <tr>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td className="book-title">{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
