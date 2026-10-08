import { useEffect } from 'react';
import BookForm from '../components/books/BookForm';
import BookTable from '../components/books/BookTable';
import { useBookStore } from '../store/useBookStore';

export default function BooksPage() {
  const { fetchBooks } = useBookStore();

  //useEffect để  lấy dữ liệu sách khi vào trang Sách
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="flex flex-col gap-6">
      <BookForm />
      <BookTable />
    </div>
  );
}
