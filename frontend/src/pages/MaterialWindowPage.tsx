/**
 * 자재 조회 전용 화면 — MegaMenu 클릭 시 새 창으로 열립니다.
 * 좌: 자재 List / 우: combobox·textbox 상세 + 신규·수정·저장
 */
import { useEffect, useRef, useState } from 'react';
import type { AgGridReact } from 'ag-grid-react';
import type { Material, MaterialPayload } from '../api';
import { materialsApi } from '../api';
import { MaterialListGrid } from '../components/MaterialListGrid';
import { useMaterials } from '../hooks/useMaterials';

const CATEGORY_OPTIONS = ['원자재', '부자재', '포장재', '소모품'];
const UNIT_OPTIONS = ['EA', 'KG', 'M', 'L', 'SET'];
const STATUS_OPTIONS = ['사용', '단종', '검토중'];

type DetailMode = 'view' | 'edit' | 'new';

const emptyDetail: Material = {
  materialCode: '',
  materialName: '',
  category: '',
  unit: '',
  supplier: '',
  status: '',
  location: '',
  stock: 0,
  remark: '',
};

function toPayload(material: Material): MaterialPayload {
  return {
    materialCode: material.materialCode.trim(),
    materialName: material.materialName.trim(),
    category: material.category,
    unit: material.unit,
    supplier: material.supplier.trim(),
    status: material.status,
    location: material.location.trim(),
    stock: Number(material.stock) || 0,
    remark: material.remark.trim(),
  };
}

export default function MaterialWindowPage() {
  const { materials, loading, error, load } = useMaterials();
  const gridRef = useRef<AgGridReact<Material>>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<Material>(emptyDetail);
  const [mode, setMode] = useState<DetailMode>('view');
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const isEditable = mode === 'edit' || mode === 'new';
  const showForm = isEditable || selectedId !== null;

  useEffect(() => {
    document.title = '자재 조회';
  }, []);

  const updateField = <K extends keyof Material>(field: K, value: Material[K]) => {
    setDetail((prev) => ({ ...prev, [field]: value }));
  };

  const handleRefresh = async () => {
    gridRef.current?.api?.deselectAll();
    setSelectedId(null);
    setDetail({ ...emptyDetail });
    setMode('view');
    setDetailError(null);
    await load();
  };

  const handleRowClick = async (material: Material) => {
    if (!material.id) return;

    setMode('view');
    setSelectedId(material.id);
    setDetailLoading(true);
    setDetailError(null);
    try {
      const data = await materialsApi.get(material.id);
      setDetail(data);
    } catch (e) {
      setDetailError(e instanceof Error ? e.message : '자재 상세를 불러오지 못했습니다.');
      setDetail(material);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleNew = () => {
    setMode('new');
    setSelectedId(null);
    setDetail({ ...emptyDetail });
    setDetailError(null);
  };

  const handleEdit = () => {
    if (!selectedId) return;
    setMode('edit');
    setDetailError(null);
  };

  const handleSave = async () => {
    const payload = toPayload(detail);

    if (!payload.materialCode || !payload.materialName) {
      setDetailError('자재코드와 자재명은 필수입니다.');
      return;
    }

    setSaving(true);
    setDetailError(null);
    try {
      if (mode === 'new') {
        const created = await materialsApi.create(payload);
        await load();
        setSelectedId(created.id ?? null);
        setDetail(created);
        setMode('view');
      } else if (mode === 'edit' && selectedId) {
        const updated = await materialsApi.update(selectedId, payload);
        await load();
        setDetail(updated);
        setMode('view');
      }
    } catch (e) {
      setDetailError(e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="material-window">
      <header className="material-window-header">
        <div>
          <h1>자재 조회</h1>
          <p className="subtitle">좌측 목록 선택 시 우측에 상세 정보가 표시됩니다.</p>
        </div>
        <button type="button" className="secondary" onClick={() => void handleRefresh()}>
          새로고침
        </button>
      </header>

      {(error || detailError) && (
        <p className="error">{error ?? detailError}</p>
      )}

      <div className="material-window-body">
        <section className="material-list-panel">
          <h2 className="section-title">자재 List</h2>
          <div className="material-list-wrap">
            <MaterialListGrid
              ref={gridRef}
              materials={materials}
              selectedId={selectedId}
              loading={loading}
              onRowSelect={(material) => void handleRowClick(material)}
            />
          </div>
        </section>

        <section className="material-detail-panel">
          <div className="material-detail-header">
            <h2 className="section-title">상세 정보</h2>
            <div className="toolbar material-detail-toolbar">
              <button type="button" className="secondary" onClick={handleNew}>
                신규
              </button>
              <button
                type="button"
                className="secondary"
                onClick={handleEdit}
                disabled={!selectedId || mode !== 'view'}
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={!isEditable || saving}
              >
                {saving ? '저장 중…' : '저장'}
              </button>
            </div>
          </div>

          {detailLoading ? (
            <p className="material-list-state">상세 정보를 불러오는 중…</p>
          ) : !showForm ? (
            <p className="material-list-state">왼쪽 목록에서 자재를 선택하거나 신규를 눌러 등록하세요.</p>
          ) : (
            <div className="material-detail-form">
              <label>
                자재코드
                <input
                  type="text"
                  value={detail.materialCode}
                  readOnly={!isEditable}
                  onChange={(e) => updateField('materialCode', e.target.value)}
                />
              </label>
              <label>
                자재명
                <input
                  type="text"
                  value={detail.materialName}
                  readOnly={!isEditable}
                  onChange={(e) => updateField('materialName', e.target.value)}
                />
              </label>
              <label>
                자재구분
                <select
                  value={detail.category}
                  disabled={!isEditable}
                  onChange={(e) => updateField('category', e.target.value)}
                >
                  <option value="">선택</option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                단위
                <select
                  value={detail.unit}
                  disabled={!isEditable}
                  onChange={(e) => updateField('unit', e.target.value)}
                >
                  <option value="">선택</option>
                  {UNIT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                공급업체
                <input
                  type="text"
                  value={detail.supplier}
                  readOnly={!isEditable}
                  onChange={(e) => updateField('supplier', e.target.value)}
                />
              </label>
              <label>
                상태
                <select
                  value={detail.status}
                  disabled={!isEditable}
                  onChange={(e) => updateField('status', e.target.value)}
                >
                  <option value="">선택</option>
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                보관위치
                <input
                  type="text"
                  value={detail.location}
                  readOnly={!isEditable}
                  onChange={(e) => updateField('location', e.target.value)}
                />
              </label>
              <label>
                재고
                <input
                  type="number"
                  min={0}
                  value={detail.stock}
                  readOnly={!isEditable}
                  onChange={(e) => updateField('stock', Number(e.target.value) || 0)}
                />
              </label>
              <label className="material-detail-remark">
                비고
                <input
                  type="text"
                  value={detail.remark}
                  readOnly={!isEditable}
                  onChange={(e) => updateField('remark', e.target.value)}
                />
              </label>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
