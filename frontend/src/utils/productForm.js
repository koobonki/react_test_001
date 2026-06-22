/**
 * 상품 CRUD 폼용 유틸.
 * API Product ↔ 입력 폼 state 변환을 담당합니다.
 */

/** 신규 등록 시 빈 폼 초기값 */
export const emptyProductForm = {
  name: '',
  category: '',
  price: 0,
  stock: 0,
};

/** API 응답 → 폼 입력값 (id 제외) */
export function toProductForm(product) {
  return {
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
  };
}
