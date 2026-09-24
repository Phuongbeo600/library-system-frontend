import { useBookStore } from '../../store/useBookStore';

export default function BookTable() {
  const { books, loading, deleteBook } = useBookStore();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Tiêu đề bảng & Thống kê nhanh */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Danh mục sách trong kho
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Danh sách tất cả các tài liệu hiện đang được quản lý.
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
          {books.length} đầu sách
        </span>
      </div>

      {/* Vùng hiển thị bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          {/* Hàng tiêu đề các cột */}
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
              <th className="py-3 px-5 w-20">Mã</th>
              <th className="py-3 px-5">Tựa đề sách</th>
              <th className="py-3 px-5">Tác giả</th>
              <th className="py-3 px-5 text-right w-28">Thao tác</th>
            </tr>
          </thead>

          {/* Nội dung danh sách */}
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {/* 1. Trạng thái đang tải */}
            {loading && books.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-xs">Đang đồng bộ dữ liệu kho...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* 2. Trạng thái kho trống */}
            {!loading && books.length === 0 && (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg
                      className="w-10 h-10 mb-2 stroke-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <p className="text-xs font-medium text-gray-500">
                      Chưa có đầu sách nào trong kho
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Hãy thêm sách mới bằng biểu mẫu bên trên
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* 3. Hiển thị danh sách sách */}
            {books.map((book) => (
              <tr
                key={book.id}
                className="hover:bg-blue-50/40 transition-colors group"
              >
                <td className="py-3.5 px-5 font-mono text-gray-400 text-[11px]">
                  #{book.id}
                </td>
                <td className="py-3.5 px-5 font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="py-3.5 px-5 text-gray-600">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px]">
                    {book.author}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm(`Bạn có chắc muốn xóa cuốn "${book.title}"?`)
                      ) {
                        deleteBook(book.id);
                      }
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                    title="Xóa đầu sách này"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
