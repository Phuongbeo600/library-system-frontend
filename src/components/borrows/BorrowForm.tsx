import { useState } from 'react';
import { useBorrowStore } from '../../store/useBorrowStore';

const getLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDefaultDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return getLocalDate(date);
};

export const BorrowForm = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [borrowDate, setBorrowDate] = useState(() => getLocalDate(new Date()));
  const [dueDate, setDueDate] = useState(getDefaultDueDate);
  const [errorText, setErrorText] = useState('');
  const addRecord = useBorrowStore((state) => state.addRecord);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId.trim() || !bookId.trim() || !borrowDate || !dueDate) {
      setErrorText('Vui lòng điền đầy đủ thông tin mượn sách.');
      return;
    }

    if (dueDate < borrowDate) {
      setErrorText('Hạn trả không thể trước ngày mượn.');
      return;
    }

    addRecord({
      id: crypto.randomUUID(),
      userId: userId.trim(),
      bookId: bookId.trim(),
      borrowDate,
      dueDate,
      status: 'BORROWED',
    });

    setUserId('');
    setBookId('');
    setBorrowDate(getLocalDate(new Date()));
    setDueDate(getDefaultDueDate());
    setErrorText('');
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-xs p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          Tạo phiếu mượn sách
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Nhập thông tin độc giả, sách và thời hạn mượn.
        </p>
      </div>

      {errorText && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600"
        >
          {errorText}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="borrower-id"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5"
            >
              Mã độc giả <span className="text-red-500">*</span>
            </label>
            <input
              id="borrower-id"
              type="text"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="VD: DG001"
              required
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="borrow-book-id"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5"
            >
              Mã sách <span className="text-red-500">*</span>
            </label>
            <input
              id="borrow-book-id"
              type="text"
              value={bookId}
              onChange={(event) => setBookId(event.target.value)}
              placeholder="VD: 12"
              required
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="borrow-date"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5"
            >
              Ngày mượn <span className="text-red-500">*</span>
            </label>
            <input
              id="borrow-date"
              type="date"
              value={borrowDate}
              onChange={(event) => setBorrowDate(event.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="borrow-due-date"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5"
            >
              Hạn trả <span className="text-red-500">*</span>
            </label>
            <input
              id="borrow-due-date"
              type="date"
              value={dueDate}
              min={borrowDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Tạo phiếu mượn</span>
          </button>
        </div>
      </form>
    </section>
  );
};