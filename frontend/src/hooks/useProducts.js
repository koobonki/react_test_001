/**
 * 상품 API 상태 관리 Custom Hook.
 *
 * React Hook = 컴포넌트 밖으로 API 호출·로딩·에러 상태를 분리하는 패턴.
 * App.jsx는 이 Hook이 반환하는 products, load, create 등만 사용합니다.
 */
import { useCallback, useState } from 'react';
import { productsApi } from '../api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 최초 마운트 시 true → 로딩 UI 표시
  const [error, setError] = useState(null);

  /** GET /api/products — 목록 새로고침 */
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

  /** GET /api/products/{id} — 카드 클릭 시 상세 조회 */
  const getById = useCallback(async (id) => {
    setError(null);
    return productsApi.get(id);
  }, []);

  /** POST 후 목록 자동 갱신 */
  const create = useCallback(async (payload) => {
    setError(null);
    const created = await productsApi.create(payload);
    await load();
    return created;
  }, [load]);

  /** PUT 후 목록 자동 갱신 */
  const update = useCallback(async (id, payload) => {
    setError(null);
    const updated = await productsApi.update(id, payload);
    await load();
    return updated;
  }, [load]);

  /** DELETE 후 목록 자동 갱신 */
  const remove = useCallback(async (id) => {
    setError(null);
    await productsApi.delete(id);
    await load();
  }, [load]);

  return { products, loading, error, setError, load, getById, create, update, remove };
}
