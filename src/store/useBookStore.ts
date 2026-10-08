import { create } from 'zustand';
import { bookService } from '../services/bookService';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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
  meta: PaginationMeta | null;
  search: string;
  page: number;
  loading: boolean;
  submitting: boolean;
  error: string | null;

  // --- Các hàm hành động (Actions) ---
  setSearch: (text: string) => void;
  setPage: (page: number) => void;
  fetchBooks: () => Promise<void>;
  addBook: (newBook: Omit<Book, 'id'>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
}

// 3. Khởi tạo Zustand Store
export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  meta: null,
  search: '',
  page: 1,
  loading: false,
  submitting: false,
  error: null,
  // Hành động cập nhật từ khóa (Khi gõ tìm kiếm mới thì luôn quay về trang 1)
  setSearch: (text) => set({ search: text, page: 1 }),

  setPage: (page) => set({ page }),

  // Hành động 1: Gọi Backend để lấy toàn bộ danh sách sách
  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      // Lấy từ khóa và số trang từ Store ra
      const { search, page } = get();

      // Gọi API gửi kèm tham số tìm kiếm
      const response = await bookService.getAll({ search, page, limit: 10 });

      set({
        books: response.data,
        meta: response.meta,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Không thể nạp dữ liệu từ máy chủ',
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
    } catch (error) {
      set({
        submitting: false,
        error: error instanceof Error ? error.message : 'Thêm sách thất bại',
      });
      // Ném lỗi ra để component BookForm có thể bắt và hiện thông báo đỏ
      throw error;
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
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Xóa sách thất bại',
      });
    }
  },
}));
