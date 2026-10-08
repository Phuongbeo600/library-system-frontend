import { Routes, Route, Navigate } from 'react-router-dom';
import BooksPage from '../pages/BooksPage';
import BorrowsPage from '../pages/BorrowsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/books" element={<BooksPage />} />
      <Route path="/borrows" element={<BorrowsPage />} />
      <Route path="/" element={<Navigate to="/books" replace />} />
    </Routes>
  );
}
