import { BorrowTable } from '../components/borrows/BorrowTable';
import { BorrowForm } from '../components/borrows/BorrowForm';
export default function BorrowsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Mượn Sách</h2>
      <BorrowTable />
      <BorrowForm />
    </div>
  );
}
