/**
 * 품목 AG Grid 컴포넌트.
 *
 * ag-grid-react 라이브러리로 테이블(그리드) UI를 렌더링합니다.
 * - showProductColumn=true: 전체 조회 시 "상품명" 컬럼 추가
 * - 행 클릭 → onSelect → App에서 Modal 오픈
 */
import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { ProductModel } from '../api';

/** 그리드 한 행 타입 (상품명 표시용 productName 필드 추가) */
export type ProductModelRow = ProductModel & {
  productName?: string;
};

type ProductModelGridProps = {
  title: string;
  models: ProductModelRow[];
  highlightedModelId: number | null;
  loading: boolean;
  showProductColumn?: boolean;
  onSelect: (model: ProductModel) => void;
};

export function ProductModelGrid({
  title,
  models,
  highlightedModelId,
  loading,
  showProductColumn = false,
  onSelect,
}: ProductModelGridProps) {
  // columnDefs: AG Grid 컬럼 정의 (헤더명, 너비, 포맷 등)
  const columnDefs = useMemo<ColDef<ProductModelRow>[]>(() => {
    const cols: ColDef<ProductModelRow>[] = [
      { field: 'id', headerName: 'ID', width: 80 },
    ];

    if (showProductColumn) {
      cols.push({ field: 'productName', headerName: '상품명', width: 130 });
    }

    cols.push(
      { field: 'modelName', headerName: '품목명', flex: 1 },
      { field: 'modelCode', headerName: '품목코드', width: 120 },
      {
        field: 'price',
        headerName: '가격',
        width: 130,
        valueFormatter: (params) =>
          params.value != null ? `${params.value.toLocaleString()}원` : '',
      },
      { field: 'stock', headerName: '재고', width: 100 },
    );

    return cols;
  }, [showProductColumn]);

  const onRowClicked = (event: RowClickedEvent<ProductModelRow>) => {
    if (event.data) onSelect(event.data);
  };

  return (
    <div className="model-panel">
      <h2 className="model-panel-title">{title} · 품목 목록 (AG Grid)</h2>
      <p className="model-panel-hint">행을 클릭하면 품목 상세 Modal이 열립니다.</p>
      <div className="model-grid-wrapper ag-theme-quartz">
        {loading && (
          <div className="model-grid-loading">품목을 불러오는 중...</div>
        )}
        <AgGridReact<ProductModelRow>
          rowData={models}
          columnDefs={columnDefs}
          onRowClicked={onRowClicked}
          rowSelection="single"
          domLayout="autoHeight"
          animateRows
          getRowClass={(params) =>
            params.data?.id === highlightedModelId ? 'ag-row-selected-custom' : undefined
          }
        />
      </div>
    </div>
  );
}
