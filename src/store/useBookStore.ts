import { create } from 'zustand';
import { bookService } from '../services/bookService';

// 1. Định nghĩa khuôn mẫu (Interface) của một cuốn sách
export interface Book {
  id: number;
  title: string;
  author: string;
}

// 2. Định nghĩa toàn bộ kiểu dữ liệu của Store (State + Actions)
interface BookState {
  // --- Dữ liệu (State) ---
  books: Book[];
  loading: boolean;
  submitting: boolean;
  error: string | null;

  // --- Các hàm hành động (Actions) ---
  fetchBooks: () => Promise<void>;
  addBook: (newBook: Omit<Book, 'id'>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
}

// 3. Khởi tạo Zustand Store
export const useBookStore = create<BookState>((set) => ({
  books: [],
  loading: false,
  submitting: false,
  error: null,

  // Hành động 1: Gọi Backend để lấy toàn bộ danh sách sách
  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const data = await bookService.getAll();
      set({ books: data, loading: false });
    } catch (err: any) {
      set({
        error: err.message || 'Không thể nạp dữ liệu từ máy chủ',
        loading: false,
      });
    }
  },

  // Hành động 2: Thêm một cuốn sách mới
  addBook: async (newBookData) => {
    set({ submitting: true, error: null });
    try {
      const createdBook = await bookService.create(newBookData);

      // Thêm cuốn mới lên đầu danh sách ngay lập tức
      set((state) => ({
        books: [createdBook, ...state.books],
        submitting: false,
      }));
    } catch (err: any) {
      set({ submitting: false, error: err.message || 'Thêm sách thất bại' });
      // Ném lỗi ra để component BookForm có thể bắt và hiện thông báo đỏ
      throw err;
    }
  },

  // Hành động 3: Xóa một cuốn sách theo ID
  deleteBook: async (id: number) => {
    try {
      await bookService.remove(id);

      // Lọc bỏ cuốn sách có id vừa xóa khỏi mảng books
      set((state) => ({
        books: state.books.filter((b) => b.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message || 'Xóa sách thất bại' });
    }
  },
}));
