import { useCallback, useEffect, useState } from 'react';
import { materialsApi, type Material } from '../api';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setMaterials(await materialsApi.list());
    } catch (e) {
      setError(e instanceof Error ? e.message : '자재 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { materials, loading, error, load };
}
