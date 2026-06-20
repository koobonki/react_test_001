import type { Product } from '../api';
import type { ProductPayload } from '../api';

/** 상품 폼 초기값 */
export const emptyProductForm: ProductPayload = {
  name: '',
  category: '',
  price: 0,
  stock: 0,
};

/** Product → 폼 payload 변환 */
export function toProductForm(product: Product): ProductPayload {
  return {
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
  };
}
