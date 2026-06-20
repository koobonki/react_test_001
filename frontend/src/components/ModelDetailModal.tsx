/**
 * 모델 상세 정보 Modal 컴포넌트.
 *
 * AG Grid에서 모델 행을 클릭하면 App.tsx가 이 Modal을 띄웁니다.
 * - overlay(반투명 배경) 클릭 → onClose 호출
 * - Modal 내부 클릭 → stopPropagation으로 닫히지 않음
 * - "수정하기" → onEdit 호출 후 App에서 CRUD 폼으로 데이터 이동
 */
import type { ProductModel } from '../api';

type ModelDetailModalProps = {
  productName: string;       // 소속 상품명 (예: 노트북)
  model: ProductModel;       // Grid에서 클릭한 모델 데이터
  onClose: () => void;       // Modal 닫기
  onEdit: () => void;        // 수정 폼으로 전환
};

export function ModelDetailModal({ productName, model, onClose, onEdit }: ModelDetailModalProps) {
  return (
    // 배경(overlay) — 클릭하면 Modal 닫힘
    <div className="modal-overlay" onClick={onClose} role="presentation">
      {/* Modal 본문 — 클릭 이벤트가 overlay로 전달되지 않도록 막음 */}
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-detail-title"
      >
        <div className="modal-header">
          <h2 id="model-detail-title">{model.modelName}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        {/* 상세 정보 목록 (읽기 전용) */}
        <div className="modal-body">
          <dl className="detail-list">
            <div className="detail-row">
              <dt>상품</dt>
              <dd>{productName}</dd>
            </div>
            <div className="detail-row">
              <dt>모델 ID</dt>
              <dd>{model.id}</dd>
            </div>
            <div className="detail-row">
              <dt>모델코드</dt>
              <dd>{model.modelCode}</dd>
            </div>
            <div className="detail-row">
              <dt>가격</dt>
              <dd className="detail-price">{model.price.toLocaleString()}원</dd>
            </div>
            <div className="detail-row">
              <dt>재고</dt>
              <dd>{model.stock}개</dd>
            </div>
          </dl>
        </div>

        <div className="modal-footer">
          <button type="button" className="secondary" onClick={onClose}>
            닫기
          </button>
          <button type="button" onClick={onEdit}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
