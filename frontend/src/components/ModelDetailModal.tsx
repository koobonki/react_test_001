/**
 * 품목 상세 Modal 컴포넌트.
 *
 * - overlay(반투명 배경) 클릭 → 닫기
 * - Modal 내부 클릭 → stopPropagation으로 닫히지 않음
 * - "수정하기" → onEdit → App에서 품목 CRUD 폼으로 데이터 이동
 */
import type { ProductModel } from '../api';

type ModelDetailModalProps = {
  productName: string;
  model: ProductModel;
  onClose: () => void;
  onEdit: () => void;
};

export function ModelDetailModal({ productName, model, onClose, onEdit }: ModelDetailModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
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
        <div className="modal-body">
          <dl className="detail-list">
            <div className="detail-row">
              <dt>상품</dt>
              <dd>{productName}</dd>
            </div>
            <div className="detail-row">
              <dt>품목 ID</dt>
              <dd>{model.id}</dd>
            </div>
            <div className="detail-row">
              <dt>품목코드</dt>
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
