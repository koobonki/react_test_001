/**
 * 품목(ProductModel) API 상태 관리 Custom Hook.
 *
 * - load(productId): 한 상품의 품목만 조회 (카드 클릭 시)
 * - loadAllForProducts: 여러 상품 품목을 합쳐 조회 (화면 시작·전체 Tab)
 */
import { useCallback, useState } from 'react';
import { productModelsApi } from '../api';

export function useProductModels() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false); // Modal 상세 로딩
  const [error, setError] = useState(null);

  /** 단일 상품의 품목 목록 */
  const load = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      setModels(await productModelsApi.list(productId));
    } catch (e) {
      setModels([]);
      setError(e instanceof Error ? e.message : '모델 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 화면 시작·전체 Tab용: productList에 속한 모든 상품의 품목을
   * Promise.all로 병렬 조회한 뒤 하나의 배열로 합칩니다.
   */
  const loadAllForProducts = useCallback(async (productList) => {
    const productIds = productList
      .map((product) => product.id)
      .filter((id) => id != null);

    if (productIds.length === 0) {
      setModels([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const lists = await Promise.all(productIds.map((id) => productModelsApi.list(id)));
      setModels(lists.flat());
    } catch (e) {
      setModels([]);
      setError(e instanceof Error ? e.message : '품목 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  /** AG Grid 행 클릭 → Modal용 단건 상세 */
  const getById = useCallback(async (productId, modelId) => {
    setDetailLoading(true);
    setError(null);
    try {
      return await productModelsApi.get(productId, modelId);
    } catch (e) {
      setError(e instanceof Error ? e.message : '모델을 불러오지 못했습니다.');
      return null;
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const create = useCallback(async (productId, payload) => {
    setError(null);
    const created = await productModelsApi.create(productId, payload);
    await load(productId);
    return created;
  }, [load]);

  const update = useCallback(async (productId, modelId, payload) => {
    setError(null);
    const updated = await productModelsApi.update(productId, modelId, payload);
    await load(productId);
    return updated;
  }, [load]);

  const remove = useCallback(async (productId, modelId) => {
    setError(null);
    await productModelsApi.delete(productId, modelId);
    await load(productId);
  }, [load]);

  const clear = useCallback(() => {
    setModels([]);
  }, []);

  return {
    models,
    loading,
    detailLoading,
    error,
    setError,
    load,
    loadAllForProducts,
    getById,
    create,
    update,
    remove,
    clear,
  };
}
