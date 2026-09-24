import Sidebar from './Sidebar';
import Header from './Header';

// Thằng này nhận "children" (tức là đồ đạc muốn nhét vào lòng nó)
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 space-y-6 overflow-y-auto">
          {children} {/* Chỗ để nhét đồ đạc vào */}
        </main>
      </div>
    </div>
  );
}
