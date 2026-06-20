/**
 * 상품 관련 REST API 상태/로직 Hook.
 * App 컴포넌트에서 UI와 API 호출을 분리합니다.
 */
import { useCallback, useState } from 'react';
import { productsApi, type Product, type ProductPayload } from '../api';

export type { ProductPayload };

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProducts(await productsApi.list());
    } catch (e) {
      setError(e instanceof Error ? e.message : '상품 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id: number) => {
    setError(null);
    return productsApi.get(id);
  }, []);

  const create = useCallback(async (payload: ProductPayload) => {
    setError(null);
    const created = await productsApi.create(payload);
    await load();
    return created;
  }, [load]);

  const update = useCallback(async (id: number, payload: ProductPayload) => {
    setError(null);
    const updated = await productsApi.update(id, payload);
    await load();
    return updated;
  }, [load]);

  const remove = useCallback(async (id: number) => {
    setError(null);
    await productsApi.delete(id);
    await load();
  }, [load]);

  return {
    products,
    loading,
    error,
    setError,
    load,
    getById,
    create,
    update,
    remove,
  };
}
