/**
 * AG Grid로 모델 목록을 표시하는 컴포넌트.
 * 그리드 행 클릭 시 onSelect로 선택된 모델을 부모(App)에 전달합니다.
 * App에서 ModelDetailModal을 엽니다.
 */
import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { ProductModel } from '../api';

type ProductModelGridProps = {
  productName: string;
  models: ProductModel[];
  highlightedModelId: number | null;
  loading: boolean;
  onSelect: (model: ProductModel) => void;
};

export function ProductModelGrid({
  productName,
  models,
  highlightedModelId,
  loading,
  onSelect,
}: ProductModelGridProps) {
  /** 그리드 컬럼 정의. useMemo로 불필요한 재생성 방지 */
  const columnDefs = useMemo<ColDef<ProductModel>[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'modelName', headerName: '모델명', flex: 1 },
      { field: 'modelCode', headerName: '모델코드', width: 120 },
      {
        field: 'price',
        headerName: '가격',
        width: 130,
        valueFormatter: (params) =>
          params.value != null ? `${params.value.toLocaleString()}원` : '',
      },
      { field: 'stock', headerName: '재고', width: 100 },
    ],
    [],
  );

  /** 행 클릭 → 부모(App)의 openModelDetail 호출 → ModelDetailModal 표시 */
  const onRowClicked = (event: RowClickedEvent<ProductModel>) => {
    if (event.data) {
      onSelect(event.data);
    }
  };

  return (
    <div className="model-panel">
      <h2 className="model-panel-title">{productName} 모델 목록</h2>
      {loading ? (
        <div className="model-grid-state">모델을 불러오는 중...</div>
      ) : (
        <div className="model-grid-wrapper ag-theme-quartz">
          <AgGridReact<ProductModel>
            rowData={models}
            columnDefs={columnDefs}
            onRowClicked={onRowClicked}
            rowSelection="single"
            domLayout="autoHeight"
            animateRows
            getRowClass={(params) =>
              // Modal 또는 폼 수정 중인 행(highlightedModelId)에 파란 배경 적용
              params.data?.id === highlightedModelId ? 'ag-row-selected-custom' : undefined
            }
          />
        </div>
      )}
    </div>
  );
}
