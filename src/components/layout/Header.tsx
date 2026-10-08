import { useState } from 'react';
import { useBookStore } from '../../store/useBookStore';

export default function Header() {
  // Quản lý từ khóa đang gõ (chưa gọi API vội)
  const [inputText, setInputText] = useState('');
  // Lấy hàm tìm kiếm, gọi API và thông tin meta (để đếm tổng số) từ Store

  const { meta, setSearch, fetchBooks } = useBookStore();
  // 3. Hàm kích hoạt khi bấm nút "Tìm" hoặc nhấn Enter

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang
    setSearch(inputText);
    fetchBooks();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
      {/* CỘT TRÁI: Ô tìm kiếm nhanh */}
      <form onSubmit={handleSearch} className="flex gap-2 w-96">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tìm kiếm ..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Nút kích hoạt tìm kiếm */}
        <button
          type="submit"
          className="px-4 py-2 text-xs bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0 cursor-pointer"
        >
          Tìm
        </button>
      </form>

      {/* CỘT PHẢI: Số liệu kho sách & Biểu tượng tiện ích */}
      <div className="flex items-center gap-4">
        {/* Huy hiệu hiển thị tổng số sách (tự nhảy khi thêm/xóa) */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>
            Kho lưu trữ: <strong>{meta?.total || 0}</strong> đầu sách
          </span>
        </div>

        {/* Nút Chuông thông báo */}
        <button
          type="button"
          title="Thông báo"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
