/**
 * 메인 App 컴포넌트.
 *
 * 구조:
 * - api.ts / hooks: REST API 호출
 * - utils: 폼 데이터 변환
 * - components: UI (카드, Grid, Modal)
 * - App: 상태 조합 + 이벤트 핸들러
 */
import { useEffect, useMemo, useState } from 'react';
import type { Product, ProductModel, ProductModelPayload, ProductPayload } from './api';
import { ProductCardGrid } from './components/ProductCardGrid';
import { ProductModelGrid } from './components/ProductModelGrid';
import { ModelDetailModal } from './components/ModelDetailModal';
import { ToggleSwitch } from './components/ToggleSwitch';
import { useProducts } from './hooks/useProducts';
import { useProductModels } from './hooks/useProductModels';
import { emptyProductForm, toProductForm } from './utils/productForm';
import { emptyModelForm, toModelForm } from './utils/modelForm';

const CATEGORY_TABS = ['전체', '전자기기', '가구'] as const;
type CategoryTab = (typeof CATEGORY_TABS)[number];

function App() {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    setError: setProductsError,
    load: loadProducts,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
    remove: deleteProduct,
  } = useProducts();

  const {
    models,
    loading: modelsLoading,
    detailLoading,
    error: modelsError,
    setError: setModelsError,
    load: loadModels,
    getById: getModelById,
    create: createModel,
    update: updateModel,
    remove: deleteModel,
    clear: clearModels,
  } = useProductModels();

  const [productForm, setProductForm] = useState<ProductPayload>(emptyProductForm);
  const [modelForm, setModelForm] = useState<ProductModelPayload>(emptyModelForm);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
  /** 폼 수정 모드일 때만 설정 (Modal 클릭과 분리) */
  const [editingModelId, setEditingModelId] = useState<number | null>(null);
  /** GET /api/products/{id}/models/{modelId} 로 조회한 Modal 데이터 */
  const [detailModel, setDetailModel] = useState<ProductModel | null>(null);
  const [categoryTab, setCategoryTab] = useState<CategoryTab>('전체');

  /** 상품재고 토글 — true면 재고 있는 상품(stock > 0)만 카드에 표시 */
  const [productStockOnly, setProductStockOnly] = useState(false);

  /** 재고10개 이상 토글 — true면 stock >= 10 모델만 AG Grid에 표시 */
  const [modelStock10Plus, setModelStock10Plus] = useState(false);

  const error = productsError ?? modelsError;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /** 카테고리 Tab + 상품재고 토글로 상품 카드 목록 필터 (클라이언트 사이드) */
  const filteredProducts = useMemo(() => {
    let result =
      categoryTab === '전체'
        ? products
        : products.filter((product) => product.category === categoryTab);

    if (productStockOnly) {
      result = result.filter((product) => product.stock > 0);
    }

    return result;
  }, [products, categoryTab, productStockOnly]);

  /** 재고10개 이상 토글로 모델 Grid 목록 필터 (클라이언트 사이드) */
  const filteredModels = useMemo(() => {
    if (!modelStock10Plus) return models;
    return models.filter((model) => model.stock >= 10);
  }, [models, modelStock10Plus]);

  /** Grid/Modal에서 강조 표시할 모델 id */
  const highlightedModelId = detailModel?.id ?? editingModelId;

  const clearModelUi = () => {
    setEditingModelId(null);
    setDetailModel(null);
    setModelForm(emptyModelForm);
  };

  /** GET /api/products/{id} + GET .../models — 상품 선택 */
  const selectProduct = async (product: Product) => {
    if (!product.id) return;

    setSelectedProductId(product.id);
    setSelectedProductName(product.name);
    clearModelUi();
    setProductsError(null);
    setModelsError(null);

    try {
      const detail = await getProductById(product.id);
      setProductForm(toProductForm(detail));
    } catch {
      setProductForm(toProductForm(product));
    }

    await loadModels(product.id);
  };

  /** GET /api/products/{productId}/models/{id} — Modal 상세 조회 */
  const openModelDetail = async (model: ProductModel) => {
    if (!model.id || !selectedProductId) return;

    setProductsError(null);
    setModelsError(null);
    const detail = await getModelById(selectedProductId, model.id);
    if (detail) {
      setDetailModel(detail);
    }
  };

  const closeModelDetail = () => {
    setDetailModel(null);
  };

  /** Modal → 폼 수정 모드 전환 */
  const editModelFromDetail = () => {
    if (!detailModel?.id) return;
    setEditingModelId(detailModel.id);
    setModelForm(toModelForm(detailModel));
    setDetailModel(null);
  };

  const resetProductForm = () => {
    setSelectedProductId(null);
    setSelectedProductName(null);
    clearModelUi();
    clearModels();
    setProductForm(emptyProductForm);
  };

  const resetModelForm = () => {
    setEditingModelId(null);
    setModelForm(emptyModelForm);
  };

  const handleProductSubmit = async () => {
    setProductsError(null);
    try {
      if (selectedProductId) {
        const updated = await updateProduct(selectedProductId, productForm);
        setProductForm(toProductForm(updated));
        setSelectedProductName(updated.name);
      } else {
        await createProduct(productForm);
        resetProductForm();
      }
    } catch (e) {
      setProductsError(e instanceof Error ? e.message : '상품 저장에 실패했습니다.');
    }
  };

  const handleProductDelete = async () => {
    if (!selectedProductId) return;
    setProductsError(null);
    try {
      await deleteProduct(selectedProductId);
      resetProductForm();
    } catch (e) {
      setProductsError(e instanceof Error ? e.message : '상품 삭제에 실패했습니다.');
    }
  };

  const handleModelSubmit = async () => {
    if (!selectedProductId) return;
    setModelsError(null);
    try {
      if (editingModelId) {
        await updateModel(selectedProductId, editingModelId, modelForm);
      } else {
        await createModel(selectedProductId, modelForm);
      }
      resetModelForm();
    } catch (e) {
      setModelsError(e instanceof Error ? e.message : '모델 저장에 실패했습니다.');
    }
  };

  const handleModelDelete = async () => {
    if (!selectedProductId || !editingModelId) return;
    setModelsError(null);
    try {
      await deleteModel(selectedProductId, editingModelId);
      clearModelUi();
    } catch (e) {
      setModelsError(e instanceof Error ? e.message : '모델 삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>상품 관리</h1>
      <p className="subtitle">REST API CRUD · Spring Boot 3 + H2 + React</p>

      {error && <p className="error">{error}</p>}

      <section className="section-panel">
        <h2 className="section-title">상품 API · /api/products</h2>
        <div className="form-panel">
          <label>
            상품명
            <input
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            />
          </label>
          <label>
            카테고리
            <input
              value={productForm.category}
              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
            />
          </label>
          <label>
            가격
            <input
              type="number"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
            />
          </label>
          <label>
            재고
            <input
              type="number"
              value={productForm.stock}
              onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
            />
          </label>
        </div>
        <div className="toolbar">
          <button onClick={handleProductSubmit}>
            {selectedProductId ? 'PUT 수정' : 'POST 등록'}
          </button>
          <button className="secondary" onClick={resetProductForm}>
            초기화
          </button>
          {selectedProductId && (
            <button className="danger" onClick={handleProductDelete}>
              DELETE 삭제
            </button>
          )}
          <button className="secondary" onClick={loadProducts}>
            GET 새로고침
          </button>
        </div>
      </section>

      <div className="grid-panel">
        {/* Tab(왼쪽) + 재고 필터 토글(오른쪽) */}
        <div className="category-tabs-bar">
          <div className="category-tabs" role="tablist" aria-label="카테고리">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={categoryTab === tab}
                className={categoryTab === tab ? 'tab active' : 'tab'}
                onClick={() => setCategoryTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="category-tab-filters">
            {/* ON: stock > 0 상품만 → filteredProducts */}
            <ToggleSwitch
              label="상품재고"
              checked={productStockOnly}
              onChange={setProductStockOnly}
            />
            {/* ON: stock >= 10 모델만 → filteredModels → ProductModelGrid */}
            <ToggleSwitch
              label="재고10개 이상"
              checked={modelStock10Plus}
              onChange={setModelStock10Plus}
            />
          </div>
        </div>
        <ProductCardGrid
          products={filteredProducts}
          selectedId={selectedProductId}
          loading={productsLoading}
          onSelect={selectProduct}
        />
      </div>

      {selectedProductId && selectedProductName && (
        <>
          <section className="section-panel">
            <h2 className="section-title">
              모델 API · /api/products/{selectedProductId}/models
            </h2>
            <div className="form-panel">
              <label>
                모델명
                <input
                  value={modelForm.modelName}
                  onChange={(e) => setModelForm({ ...modelForm, modelName: e.target.value })}
                />
              </label>
              <label>
                모델코드
                <input
                  value={modelForm.modelCode}
                  onChange={(e) => setModelForm({ ...modelForm, modelCode: e.target.value })}
                />
              </label>
              <label>
                가격
                <input
                  type="number"
                  value={modelForm.price}
                  onChange={(e) => setModelForm({ ...modelForm, price: Number(e.target.value) })}
                />
              </label>
              <label>
                재고
                <input
                  type="number"
                  value={modelForm.stock}
                  onChange={(e) => setModelForm({ ...modelForm, stock: Number(e.target.value) })}
                />
              </label>
            </div>
            <div className="toolbar">
              <button onClick={handleModelSubmit}>
                {editingModelId ? 'PUT 수정' : 'POST 등록'}
              </button>
              <button className="secondary" onClick={resetModelForm}>
                초기화
              </button>
              {editingModelId && (
                <button className="danger" onClick={handleModelDelete}>
                  DELETE 삭제
                </button>
              )}
              <button className="secondary" onClick={() => loadModels(selectedProductId)}>
                GET 새로고침
              </button>
            </div>
          </section>

          <ProductModelGrid
            productName={selectedProductName}
            models={filteredModels}
            highlightedModelId={highlightedModelId}
            loading={modelsLoading || detailLoading}
            onSelect={openModelDetail}
          />

          {detailModel && (
            <ModelDetailModal
              productName={selectedProductName}
              model={detailModel}
              onClose={closeModelDetail}
              onEdit={editModelFromDetail}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
