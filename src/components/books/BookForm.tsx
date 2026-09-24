import { useState } from 'react';
import { useBookStore } from '../../store/useBookStore';

export default function BookForm() {
  // 1. Quản lý trạng thái nhập liệu cục bộ trong form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [errorText, setErrorText] = useState('');

  // 2. Lấy hành động và trạng thái từ Zustand Store
  const { addBook, submitting } = useBookStore();

  // 3. Xử lý khi nhấn nút Thêm
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      setErrorText('Vui lòng điền đầy đủ cả tên sách và tác giả.');
      return;
    }

    setErrorText('');
    try {
      await addBook({
        title: title.trim(),
        author: author.trim(),
      });
      // Làm sạch các ô nhập sau khi thêm thành công
      setTitle('');
      setAuthor('');
    } catch {
      setErrorText('Có lỗi xảy ra khi thêm sách. Vui lòng thử lại!');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6">
      {/* Tiêu đề của khối Form */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          Thêm đầu sách mới
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Nhập thông tin ấn bản để lưu trữ vào cơ sở dữ liệu kho.
        </p>
      </div>

      {/* Thông báo lỗi nếu để trống */}
      {errorText && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600 flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errorText}</span>
        </div>
      )}

      {/* Biểu mẫu nhập liệu */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cột 1: Nhập tựa đề sách */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Tên sách <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="VD: Giáo trình Mạng máy tính"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Cột 2: Nhập tác giả */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Tác giả <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="VD: Andrew S. Tanenbaum"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Lưu vào kho</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
