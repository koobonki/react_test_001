/**
 * 모델 관련 REST API 상태/로직 Hook.
 * nested resource: /api/products/{productId}/models
 */
import { useCallback, useState } from 'react';
import { productModelsApi, type ProductModel, type ProductModelPayload } from '../api';

export type { ProductModelPayload };

export function useProductModels() {
  const [models, setModels] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (productId: number) => {
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

  /** GET /api/products/{productId}/models/{id} — Modal 상세용 */
  const getById = useCallback(async (productId: number, modelId: number) => {
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

  const create = useCallback(async (productId: number, payload: ProductModelPayload) => {
    setError(null);
    const created = await productModelsApi.create(productId, payload);
    await load(productId);
    return created;
  }, [load]);

  const update = useCallback(async (productId: number, modelId: number, payload: ProductModelPayload) => {
    setError(null);
    const updated = await productModelsApi.update(productId, modelId, payload);
    await load(productId);
    return updated;
  }, [load]);

  const remove = useCallback(async (productId: number, modelId: number) => {
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
    getById,
    create,
    update,
    remove,
    clear,
  };
}
