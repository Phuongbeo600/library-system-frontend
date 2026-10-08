import React from 'react';
import { useBorrowStore } from '../../store/useBorrowStore';

export const BorrowTable = () => {
  const { records, returnBook, cancelRecord } = useBorrowStore();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th>Độc giả</th>
            <th>Sách</th>
            <th>Ngày mượn</th>
            <th>Hạn trả</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-t">
              <td>{record.userId}</td>
              <td>{record.bookId}</td>
              <td>{record.borrowDate}</td>
              <td>{record.dueDate}</td>
              <td>
                {/* Đổi màu tùy theo trạng thái */}
                <span
                  className={`px-2 py-1 rounded ${record.status === 'BORROWED' ? 'bg-yellow-200' : 'bg-green-200'}`}
                >
                  {record.status}
                </span>
              </td>
              <td>
                {/* Chỉ hiện nút thao tác nếu sách đang mượn */}
                {record.status === 'BORROWED' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => returnBook(record.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Trả sách
                    </button>
                    <button
                      onClick={() => cancelRecord(record.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Nhập sai
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
