import type { Product, ProductPayload } from '../api';

export const emptyProductForm: ProductPayload = {
  name: '',
  menuCode: '',
  category: '',
  price: 0,
  stock: 0,
};

export function getProductMenuCode(product: Pick<Product, 'id' | 'menuCode'>): string {
  const code = product.menuCode?.trim();
  if (code) return code;
  if (product.id != null) return `PRD-${product.id}`;
  return '';
}

export function toProductForm(product: Product): ProductPayload {
  return {
    name: product.name,
    menuCode: getProductMenuCode(product),
    category: product.category,
    price: product.price,
    stock: product.stock,
  };
}
