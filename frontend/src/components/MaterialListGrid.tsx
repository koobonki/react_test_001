/**
 * 자재 목록 AG Grid — MaterialWindowPage 좌측 패널.
 */
import { forwardRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { Material } from '../api';

type MaterialListGridProps = {
  materials: Material[];
  selectedId: number | null;
  loading: boolean;
  onRowSelect: (material: Material) => void;
};

export const MaterialListGrid = forwardRef<AgGridReact<Material>, MaterialListGridProps>(
  function MaterialListGrid({ materials, selectedId, loading, onRowSelect }, ref) {
    const columnDefs = useMemo<ColDef<Material>[]>(
      () => [
        { field: 'groupCode', headerName: '자재그룹코드', width: 110 },
        { field: 'groupName', headerName: '자재그룹', width: 110 },
        { field: 'materialCode', headerName: '코드', width: 110 },
        { field: 'materialName', headerName: '자재명', flex: 1, minWidth: 120 },
        { field: 'category', headerName: '구분', width: 90 },
        { field: 'stock', headerName: '재고', width: 80 },
      ],
      [],
    );

    const onRowClicked = (event: RowClickedEvent<Material>) => {
      if (event.data) onRowSelect(event.data);
    };

    return (
      <div className="material-list-grid model-grid-wrapper ag-theme-quartz">
        {loading && (
          <div className="model-grid-loading">불러오는 중…</div>
        )}
        <AgGridReact<Material>
          ref={ref}
          rowData={materials}
          columnDefs={columnDefs}
          onRowClicked={onRowClicked}
          rowSelection="single"
          animateRows
          overlayNoRowsTemplate="등록된 자재가 없습니다."
          getRowClass={(params) =>
            params.data?.id === selectedId ? 'ag-row-selected-custom' : undefined
          }
        />
      </div>
    );
  },
);
