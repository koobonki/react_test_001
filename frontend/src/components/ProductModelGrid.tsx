/**
 * 품목 AG Grid 컴포넌트.
 * 행 더블클릭 → 품목 상세 페이지로 이동합니다.
 */
import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowDoubleClickedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { ProductModel } from '../api';

export type ProductModelRow = ProductModel & {
  productName?: string;
};

type ProductModelGridProps = {
  title: string;
  models: ProductModelRow[];
  highlightedModelId: number | null;
  loading: boolean;
  showProductColumn?: boolean;
  onOpenDetail: (model: ProductModel) => void;
};

export function ProductModelGrid({
  title,
  models,
  highlightedModelId,
  loading,
  showProductColumn = false,
  onOpenDetail,
}: ProductModelGridProps) {
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

  const onRowDoubleClicked = (event: RowDoubleClickedEvent<ProductModelRow>) => {
    if (event.data) onOpenDetail(event.data);
  };

  return (
    <div className="model-panel">
      <h2 className="model-panel-title">{title} · 품목 목록 (AG Grid)</h2>
      <p className="model-panel-hint">행을 더블클릭하면 품목 상세 화면이 열립니다.</p>
      <div className="model-grid-wrapper ag-theme-quartz">
        {loading && (
          <div className="model-grid-loading">품목을 불러오는 중...</div>
        )}
        <AgGridReact<ProductModelRow>
          rowData={models}
          columnDefs={columnDefs}
          onRowDoubleClicked={onRowDoubleClicked}
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
