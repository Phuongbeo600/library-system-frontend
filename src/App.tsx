import { useEffect } from 'react';
import './css/tailwind.css';

import MainLayout from './components/layout/MainLayout';
import BookForm from './components/books/BookForm';
import BookTable from './components/books/BookTable';
import { useBookStore } from './store/useBookStore';

export default function App() {
  const { fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <MainLayout>
      <BookForm />
      <BookTable />
    </MainLayout>
  );
}
