import { BrowserRouter } from 'react-router-dom';
import './css/tailwind.css';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}
