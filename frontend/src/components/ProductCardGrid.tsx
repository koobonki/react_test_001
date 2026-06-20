/**
 * 상품 카드 그리드 컴포넌트.
 *
 * Tab으로 필터된 상품 목록을 아이콘 카드(5열)로 표시합니다.
 * 카드 클릭 → onSelect(product) → App에서 상품 선택 + 품목 로드
 */
import type { Product } from '../api';

/** 상품명에 맞는 이모지 (DB가 아닌 Frontend 하드코딩) */
const PRODUCT_ICONS: Record<string, string> = {
  노트북: '💻',
  '무선 마우스': '🖱️',
  '기계식 키보드': '⌨️',
  책상: '🗄️',
  의자: '🪑',
};

/** 상품명 매칭 실패 시 카테고리별 기본 아이콘 */
const CATEGORY_ICONS: Record<string, string> = {
  전자기기: '📱',
  가구: '🛋️',
};

const DEFAULT_ICON = '📦';

function getProductIcon(name: string, category: string) {
  return PRODUCT_ICONS[name] ?? CATEGORY_ICONS[category] ?? DEFAULT_ICON;
}

type CategoryTab = '전체' | '전자기기' | '가구';

type ProductCardGridProps = {
  products: Product[];
  selectedId: number | null;
  loading: boolean;
  activeCategory: CategoryTab;
  onSelect: (product: Product) => void;
};

export function ProductCardGrid({
  products,
  selectedId,
  loading,
  activeCategory,
  onSelect,
}: ProductCardGridProps) {
  if (loading) {
    return <div className="product-grid-state">상품을 불러오는 중...</div>;
  }

  if (products.length === 0) {
    const emptyMessage =
      activeCategory === '전체'
        ? '표시할 상품이 없습니다.'
        : `'${activeCategory}' 카테고리에 표시할 상품이 없습니다.`;
    return <div className="product-grid-state">{emptyMessage}</div>;
  }

  return (
    <>
      <p className="product-grid-caption">
        {activeCategory === '전체'
          ? `전체 ${products.length}개 상품`
          : `${activeCategory} · ${products.length}개 상품`}
      </p>
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
    </>
  );
}
