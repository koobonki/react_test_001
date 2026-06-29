/**
 * 품목 상세 화면 — AG Grid 더블클릭 시 /products/:productId/models/:modelId 로 이동합니다.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productModelsApi, productsApi, type Product, type ProductModel } from '../api';

export default function ProductModelDetailPage() {
  const navigate = useNavigate();
  const { productId: productIdParam, modelId: modelIdParam } = useParams();
  const productId = Number(productIdParam);
  const modelId = Number(modelIdParam);

  const [product, setProduct] = useState<Product | null>(null);
  const [model, setModel] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId || !modelId) {
      setError('잘못된 품목 경로입니다.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productData, modelData] = await Promise.all([
          productsApi.get(productId),
          productModelsApi.get(productId, modelId),
        ]);
        if (cancelled) return;
        setProduct(productData);
        setModel(modelData);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : '품목 정보를 불러오지 못했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [productId, modelId]);

  const handleEdit = () => {
    navigate('/products', {
      state: { editModel: { productId, modelId } },
    });
  };

  if (loading) {
    return (
      <div className="model-detail-page">
        <p className="model-detail-state">품목 정보를 불러오는 중…</p>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="model-detail-page">
        <p className="error">{error ?? '품목을 찾을 수 없습니다.'}</p>
        <Link to="/products" className="model-detail-back-link">
          ← 상품 관리로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="model-detail-page">
      <div className="model-detail-header">
        <div>
          <p className="model-detail-breadcrumb">
            <Link to="/products">상품관리</Link>
            <span> / </span>
            <span>{product?.name ?? '상품'}</span>
            <span> / </span>
            <span>{model.modelName}</span>
          </p>
          <h1>{model.modelName}</h1>
          <p className="subtitle">품목 상세 · /api/products/{productId}/models/{modelId}</p>
        </div>
        <div className="toolbar">
          <button type="button" className="secondary" onClick={() => navigate('/products')}>
            목록으로
          </button>
          <button type="button" onClick={handleEdit}>
            수정하기
          </button>
        </div>
      </div>

      <section className="model-detail-card section-panel">
        <h2 className="section-title">품목 정보</h2>
        <dl className="detail-list">
          <div className="detail-row">
            <dt>상품명</dt>
            <dd>{product?.name ?? '-'}</dd>
          </div>
          <div className="detail-row">
            <dt>상품 ID</dt>
            <dd>{productId}</dd>
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
      </section>
    </div>
  );
}
