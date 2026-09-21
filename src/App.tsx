import './App.css';

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Hệ thống quản lí thư viện</h1>
        <p>Theo dõi và quản lí danh mục sách</p>
      </header>

      <section className="card">
        <h3>Thêm sách mới</h3>
        <form className="book-form">
          <input
            type="text"
            placeholder="Tên cuốn sách..."
            className="input-text flex-2"
          />
          <input
            type="text"
            placeholder="Tên tác giả..."
            className="input-text flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Lưu sách
          </button>
        </form>
      </section>

      <section className="card">
        <h3>Danh sách hiện có</h3>
        <table className="book-table">
          <thead>
            <tr>
              <th>Mã sách</th>
              <th>Tên sách</th>
              <th>Thao tác</th>
            </tr>
          </thead>
        </table>
      </section>
    </div>
  );
}
