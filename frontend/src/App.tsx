import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProductMenuProvider } from './context/ProductMenuContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductManagementPage from './pages/ProductManagementPage';
import ProductModelDetailPage from './pages/ProductModelDetailPage';
import InventoryPage from './pages/InventoryPage';
import GuidePage from './pages/GuidePage';
import MaterialWindowPage from './pages/MaterialWindowPage';

function App() {
  return (
    <ProductMenuProvider>
      <BrowserRouter>
        <Routes>
          {/* 자재 조회 — MegaMenu 새 창 전용 (레이아웃 없음) */}
          <Route path="/materials" element={<MaterialWindowPage />} />

          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductManagementPage />} />
            <Route path="products/:productId/models/:modelId" element={<ProductModelDetailPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductMenuProvider>
  );
}

export default App;
