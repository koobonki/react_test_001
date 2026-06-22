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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // 최초 마운트 시 true → 로딩 UI 표시
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);

  /** GET /api/products/categories — 카테고리 Tab 목록 새로고침 */
  const loadCategories = useCallback(async (options) => {
    setCategoriesLoading(true);
    setError(null);
    try {
      setCategories(await productsApi.categories(options));
    } catch (e) {
      setError(e instanceof Error ? e.message : '카테고리 목록을 불러오지 못했습니다.');
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  /** GET /api/products — 전체 또는 카테고리별 상품 목록 새로고침 */
  const load = useCallback(async (options) => {
    setLoading(true);
    setError(null);
    try {
      setProducts(await productsApi.list(options));
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

  /** POST — 저장 후 화면 갱신은 App에서 현재 Tab 조건으로 다시 조회 */
  const create = useCallback(async (payload) => {
    setError(null);
    return productsApi.create(payload);
  }, []);

  /** PUT — 저장 후 화면 갱신은 App에서 현재 Tab 조건으로 다시 조회 */
  const update = useCallback(async (id, payload) => {
    setError(null);
    return productsApi.update(id, payload);
  }, []);

  /** DELETE — 삭제 후 화면 갱신은 App에서 현재 Tab 조건으로 다시 조회 */
  const remove = useCallback(async (id) => {
    setError(null);
    await productsApi.delete(id);
  }, []);

  return {
    products,
    categories,
    loading,
    categoriesLoading,
    error,
    setError,
    load,
    loadCategories,
    getById,
    create,
    update,
    remove,
  };
}
