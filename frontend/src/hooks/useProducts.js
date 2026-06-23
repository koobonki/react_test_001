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

  /**
   * GET /api/products/categories — 카테고리 Tab 목록 새로고침.
   *
   * 흐름:
   * 1. productsApi.categories(options)가 Backend API를 호출합니다.
   * 2. Backend는 products 테이블의 category 컬럼을 그룹화해 [{ name, count }]를 응답합니다.
   * 3. setCategories(...)로 응답을 React state에 저장합니다.
   * 4. App.jsx는 categories state를 map 돌려 실제 Tab 버튼으로 렌더링합니다.
   */
  const loadCategories = useCallback(async (options) => {
    setCategoriesLoading(true);
    setError(null);
    try {
      // 여기서 받은 데이터가 App.jsx의 categoryTabs → <button role="tab">로 들어갑니다.
      setCategories(await productsApi.categories(options));
    } catch (e) {
      setError(e instanceof Error ? e.message : '카테고리 목록을 불러오지 못했습니다.');
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  /**
   * GET /api/products — 전체 또는 카테고리별 상품 목록 새로고침.
   *
   * 흐름:
   * 1. App.jsx가 현재 선택 Tab(categoryTab)과 상품재고 토글(productStockOnly)을 넘깁니다.
   * 2. productsApi.list(options)가 /api/products?category=... URL을 호출합니다.
   * 3. Backend가 products 테이블에서 조건에 맞는 상품만 조회합니다.
   * 4. setProducts(...)로 응답을 저장합니다.
   * 5. App.jsx가 이 products state를 ProductCardGrid의 products prop으로 넣습니다.
   */
  const load = useCallback(async (options) => {
    setLoading(true);
    setError(null);
    try {
      // 여기서 받은 데이터가 ProductCardGrid에 표시되는 아이콘 카드 목록입니다.
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
