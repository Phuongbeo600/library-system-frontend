import { useBorrowStore } from '../../store/useBorrowStore';

const statusLabels = {
  BORROWED: 'Đang mượn',
  RETURNED: 'Đã trả',
  OVERDUE: 'Quá hạn',
  CANCELLED: 'Đã hủy',
} as const;

const statusStyles = {
  BORROWED: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  RETURNED: 'bg-green-50 text-green-700 ring-green-600/20',
  OVERDUE: 'bg-red-50 text-red-700 ring-red-600/20',
  CANCELLED: 'bg-gray-100 text-gray-600 ring-gray-500/20',
} as const;

const formatDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('vi-VN');
};

export const BorrowTable = () => {
  const { records, returnBook, cancelRecord } = useBorrowStore();

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Danh sách mượn sách
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Theo dõi độc giả, thời hạn và trạng thái trả sách.
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
          {records.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
              <th scope="col" className="py-3 px-5">
                Độc giả
              </th>
              <th scope="col" className="py-3 px-5">
                Mã sách
              </th>
              <th scope="col" className="py-3 px-5">
                Ngày mượn
              </th>
              <th scope="col" className="py-3 px-5">
                Hạn trả
              </th>
              <th scope="col" className="py-3 px-5">
                Trạng thái
              </th>
              <th scope="col" className="py-3 px-5 text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 px-5 text-center text-xs text-gray-400"
                >
                  Chưa có phiếu mượn nào. Hãy tạo phiếu mượn mới ở biểu mẫu bên
                  dưới.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="py-3.5 px-5 font-medium text-gray-900">
                    {record.userId}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-gray-600">
                    #{record.bookId}
                  </td>
                  <td className="py-3.5 px-5 text-gray-600">
                    {formatDate(record.borrowDate)}
                  </td>
                  <td className="py-3.5 px-5 text-gray-600">
                    {formatDate(record.dueDate)}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ring-1 ring-inset ${statusStyles[record.status]}`}
                    >
                      {statusLabels[record.status]}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    {record.status === 'BORROWED' ? (
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => returnBook(record.id)}
                          className="px-3 py-1.5 text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                        >
                          Trả sách
                        </button>
                        <button
                          type="button"
                          onClick={() => cancelRecord(record.id)}
                          className="px-3 py-1.5 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                        >
                          Hủy phiếu
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
