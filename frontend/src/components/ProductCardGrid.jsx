/**
 * 상품 카드 그리드 컴포넌트.
 *
 * Tab으로 조회된 상품 목록을 아이콘 카드(5열)로 표시합니다.
 * 접힌 상태에서는 첫 줄 5개만 보여주고, 버튼/토글로 전체 목록을 펼칩니다.
 * 카드 클릭 → onSelect(product) → App에서 상품 선택 + 품목 로드
 */
const COLLAPSED_CARD_COUNT = 5;

/** 상품명에 맞는 이모지 (DB가 아닌 Frontend 하드코딩) */
const PRODUCT_ICONS = {
  노트북: '💻',
  '무선 마우스': '🖱️',
  '기계식 키보드': '⌨️',
  책상: '🗄️',
  의자: '🪑',
};

/** 상품명 매칭 실패 시 카테고리별 기본 아이콘 */
const CATEGORY_ICONS = {
  전자기기: '📱',
  가구: '🛋️',
};

const DEFAULT_ICON = '📦';

function getProductIcon(name, category) {
  return PRODUCT_ICONS[name] ?? CATEGORY_ICONS[category] ?? DEFAULT_ICON;
}

export function ProductCardGrid({
  products,
  selectedId,
  loading,
  activeCategory,
  expanded,
  onToggleExpanded,
  onSelect,
}) {
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

  const hasOverflow = products.length > COLLAPSED_CARD_COUNT;
  const visibleProducts = expanded ? products : products.slice(0, COLLAPSED_CARD_COUNT);
  const hiddenCount = Math.max(products.length - COLLAPSED_CARD_COUNT, 0);

  return (
    <>
      <p className="product-grid-caption">
        {activeCategory === '전체'
          ? `전체 ${visibleProducts.length}/${products.length}개 상품`
          : `${activeCategory} · ${visibleProducts.length}/${products.length}개 상품`}
      </p>
      <div className="product-card-grid">
        {visibleProducts.map((product) => (
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
      {hasOverflow && (
        <div className="product-grid-expand">
          <button type="button" className="secondary" onClick={onToggleExpanded}>
            {expanded ? '한 줄로 접기' : `전체 펼치기 (+${hiddenCount})`}
          </button>
        </div>
      )}
    </>
  );
}
