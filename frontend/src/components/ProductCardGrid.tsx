/**
 * 상품 카드 그리드 컴포넌트.
 * Tab으로 필터된 상품 목록을 카드(박스) 형태로 보여줍니다.
 * 카드 클릭 시 onSelect 콜백으로 선택된 상품을 부모(App)에 전달합니다.
 */
import type { Product } from '../api';

/** 상품명별 아이콘 (이모지) */
const PRODUCT_ICONS: Record<string, string> = {
  노트북: '💻',
  '무선 마우스': '🖱️',
  '기계식 키보드': '⌨️',
  책상: '🗄️',
  의자: '🪑',
};

/** 상품명에 매칭되는 아이콘이 없을 때 카테고리별 기본 아이콘 */
const CATEGORY_ICONS: Record<string, string> = {
  전자기기: '📱',
  가구: '🛋️',
};

function getProductIcon(name: string, category: string) {
  return PRODUCT_ICONS[name] ?? CATEGORY_ICONS[category] ?? '📦';
}

type ProductCardGridProps = {
  products: Product[];
  selectedId: number | null;
  loading: boolean;
  onSelect: (product: Product) => void;
};

export function ProductCardGrid({ products, selectedId, loading, onSelect }: ProductCardGridProps) {
  if (loading) {
    return <div className="product-grid-state">상품을 불러오는 중...</div>;
  }

  if (products.length === 0) {
    return <div className="product-grid-state">표시할 상품이 없습니다.</div>;
  }

  return (
    <div className="product-card-grid">
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          className={`product-card${selectedId === product.id ? ' selected' : ''}`}
          onClick={() => onSelect(product)}
        >
          <span className="product-card-icon" aria-hidden="true">
            {getProductIcon(product.name, product.category)}
          </span>
          <span className="product-card-name">{product.name}</span>
          <span className="product-card-category">{product.category}</span>
          <span className="product-card-price">{product.price.toLocaleString()}원</span>
          <span className="product-card-stock">재고 {product.stock}</span>
        </button>
      ))}
    </div>
  );
}
