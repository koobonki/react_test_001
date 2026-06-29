/**
 * 상품 MegaMenu ↔ ProductManagementPage 연동 Context.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../api';
import { getProductMenuCode } from '../utils/productForm';

type ProductMenuContextValue = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  activeMenuCode: string | null;
  setActiveMenuCode: (menuCode: string | null) => void;
  activeGroupId: string | null;
  setActiveGroupId: (groupId: string | null) => void;
  findProductByMenuCode: (menuCode: string) => Product | undefined;
};

const ProductMenuContext = createContext<ProductMenuContextValue | null>(null);

export function ProductMenuProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeMenuCode, setActiveMenuCode] = useState<string | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  const findProductByMenuCode = useCallback(
    (menuCode: string) => products.find((product) => getProductMenuCode(product) === menuCode),
    [products],
  );

  const value = useMemo(
    () => ({
      products,
      setProducts,
      activeMenuCode,
      setActiveMenuCode,
      activeGroupId,
      setActiveGroupId,
      findProductByMenuCode,
    }),
    [products, activeMenuCode, activeGroupId, findProductByMenuCode],
  );

  return <ProductMenuContext.Provider value={value}>{children}</ProductMenuContext.Provider>;
}

export function useProductMenu() {
  const context = useContext(ProductMenuContext);
  if (!context) {
    throw new Error('useProductMenu must be used within ProductMenuProvider');
  }
  return context;
}
