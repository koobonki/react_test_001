import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';

export default function InventoryPage() {
  const { products, loading, error, load } = useProducts();

  useEffect(() => {
    load();
  }, [load]);

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const inStockCount = products.filter((product) => product.stock > 0).length;

  return (
    <div>
      <h1>재고 현황</h1>
      <p className="subtitle">상품 API(/api/products) 기준 재고 요약</p>

      {error && <p className="error">{error}</p>}

      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-card-label">등록 상품</span>
          <strong>{loading ? '…' : products.length}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-card-label">재고 보유</span>
          <strong>{loading ? '…' : inStockCount}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-card-label">총 재고 수량</span>
          <strong>{loading ? '…' : totalStock}</strong>
        </div>
      </div>

      <section className="section-panel">
        <h2 className="section-title">카테고리별 재고</h2>
        <div className="inventory-table-wrap">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>상품명</th>
                <th>카테고리</th>
                <th>가격</th>
                <th>재고</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>불러오는 중…</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4}>등록된 상품이 없습니다.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price.toLocaleString()}원</td>
                    <td className={product.stock <= 0 ? 'stock-empty' : ''}>{product.stock}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
