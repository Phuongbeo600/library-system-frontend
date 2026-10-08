import { create } from 'zustand';

interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE' | 'CANCELLED';
  // CANCELLED dùng khi nhập nhầm, thay vì XÓA.
}

interface BorrowStore {
  records: BorrowRecord[];
  addRecord: (record: BorrowRecord) => void;
  returnBook: (recordId: string) => void; // Chỉnh sửa: Đánh dấu đã trả
  cancelRecord: (recordId: string) => void; // Chỉnh sửa: Đánh dấu hủy nếu nhập sai
}

export const useBorrowStore = create<BorrowStore>((set) => ({
  records: [],

  // Hành động THÊM
  addRecord: (record) =>
    set((state) => ({
      records: [...state.records, record],
    })),

  // Hành động CHỈNH SỬA (Đổi trạng thái, KHÔNG XÓA)
  returnBook: (recordId) =>
    set((state) => ({
      records: state.records.map((record) =>
        record.id === recordId ? { ...record, status: 'RETURNED' } : record,
      ),
    })),

  cancelRecord: (recordId) =>
    set((state) => ({
      records: state.records.map((record) =>
        record.id === recordId ? { ...record, status: 'CANCELLED' } : record,
      ),
    })),
}));
