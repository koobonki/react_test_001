/**
 * 메인 App 컴포넌트 — 화면 전체의 상태와 UI를 조합합니다.
 *
 * ┌─────────────────────────────────────────┐
 * │ 1. 카테고리 Tab + 상품 카드 (ProductCardGrid) │
 * │ 2. 상품 CRUD 폼                            │
 * │ 3. 품목 CRUD 폼 (상품 선택 시)              │
 * │ 4. AG Grid 품목 목록 (ProductModelGrid)    │
 * │ 5. Modal (품목 상세)                       │
 * └─────────────────────────────────────────┘
 *
 * 데이터 흐름:
 *   api.js → hooks(useProducts, useProductModels) → App state → components
 */
import { useEffect, useMemo, useState } from 'react';
import { ProductCardGrid } from './components/ProductCardGrid';
import { ProductModelGrid } from './components/ProductModelGrid';
import { ModelDetailModal } from './components/ModelDetailModal';
import { ToggleSwitch } from './components/ToggleSwitch';
import { useProducts } from './hooks/useProducts';
import { useProductModels } from './hooks/useProductModels';
import { emptyProductForm, toProductForm } from './utils/productForm';
import { emptyModelForm, toModelForm } from './utils/modelForm';

const CATEGORY_TABS = ['전체', '전자기기', '가구'];

function App() {
  // ── API Hooks: Backend 호출 로직을 컴포넌트 밖으로 분리 ──
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
    loadAllForProducts,
    getById: getModelById,
    create: createModel,
    update: updateModel,
    remove: deleteModel,
  } = useProductModels();

  // ── 로컬 UI 상태 (폼, 선택, Tab, 필터, Modal) ──
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [modelForm, setModelForm] = useState(emptyModelForm);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [editingModelId, setEditingModelId] = useState(null);
  const [detailModel, setDetailModel] = useState(null);
  const [categoryTab, setCategoryTab] = useState('전체');
  const [productStockOnly, setProductStockOnly] = useState(false);
  const [modelStock10Plus, setModelStock10Plus] = useState(false);

  const error = productsError ?? modelsError;

  /** 앱 최초 실행 시 전체 Tab + 필터 없이 모든 상품을 표시합니다. */
  useEffect(() => {
    setCategoryTab('전체');
    setProductStockOnly(false);
    setModelStock10Plus(false);
    setSelectedProductId(null);
    setSelectedProductName(null);
    setEditingModelId(null);
    setDetailModel(null);
    setProductForm(emptyProductForm);
    setModelForm(emptyModelForm);
    loadProducts();
  }, [loadProducts]);

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

  /** 상품 선택 없을 때 — Tab/필터에 맞는 전체 품목을 AG Grid에 표시 */
  useEffect(() => {
    if (productsLoading || selectedProductId) return;
    loadAllForProducts(filteredProducts);
  }, [productsLoading, selectedProductId, filteredProducts, loadAllForProducts]);

  /** Tab별 상품 개수 (재고 필터 반영) */
  const categoryCounts = useMemo(() => {
    const base =
      productStockOnly ? products.filter((p) => p.stock > 0) : products;
    return {
      전체: base.length,
      전자기기: base.filter((p) => p.category === '전자기기').length,
      가구: base.filter((p) => p.category === '가구').length,
    };
  }, [products, productStockOnly]);

  const handleCategoryTabChange = (tab) => {
    setCategoryTab(tab);
    if (!selectedProductId) return;

    const stillVisible = products.some(
      (p) =>
        p.id === selectedProductId &&
        (tab === '전체' || p.category === tab) &&
        (!productStockOnly || p.stock > 0),
    );
    if (!stillVisible) {
      resetProductForm();
    }
  };

  const filteredModels = useMemo(() => {
    if (!modelStock10Plus) return models;
    return models.filter((model) => model.stock >= 10);
  }, [models, modelStock10Plus]);

  // AG Grid 행에 상품명 컬럼을 채우기 위한 데이터 가공
  const gridModels = useMemo(() => {
    const nameById = new Map(products.map((product) => [product.id, product.name]));
    return filteredModels.map((model) => ({
      ...model,
      productName: model.productId ? nameById.get(model.productId) ?? '' : '',
    }));
  }, [filteredModels, products]);

  const gridTitle = selectedProductName
    ? selectedProductName
    : categoryTab === '전체'
      ? '전체'
      : categoryTab;

  const highlightedModelId = detailModel?.id ?? editingModelId;

  // ── 이벤트 핸들러 ──

  const clearModelUi = () => {
    setEditingModelId(null);
    setDetailModel(null);
    setModelForm(emptyModelForm);
  };

  /** 상품 카드 클릭: 폼 채우기 + 해당 상품 품목만 AG Grid에 표시 */
  const selectProduct = async (product) => {
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

  const openModelDetail = async (model) => {
    const productId = model.productId ?? selectedProductId;
    if (!model.id || !productId) return;

    setProductsError(null);
    setModelsError(null);
    const detail = await getModelById(productId, model.id);
    if (detail) setDetailModel(detail);
  };

  const closeModelDetail = () => setDetailModel(null);

  const editModelFromDetail = () => {
    if (!detailModel?.id) return;

    const productId = detailModel.productId ?? selectedProductId;
    if (productId && !selectedProductId) {
      const product = products.find((item) => item.id === productId);
      if (product?.id) {
        setSelectedProductId(product.id);
        setSelectedProductName(product.name);
        setProductForm(toProductForm(product));
      }
    }

    setEditingModelId(detailModel.id);
    setModelForm(toModelForm(detailModel));
    setDetailModel(null);
  };

  const detailProductName =
    products.find((product) => product.id === detailModel?.productId)?.name ??
    selectedProductName ??
    '';

  const resetProductForm = () => {
    setSelectedProductId(null);
    setSelectedProductName(null);
    clearModelUi();
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

      {/* ── 1. 카테고리 Tab + 상품 카드 ── */}
      <div className="grid-panel">
        <div className="category-tabs-bar">
          <div className="category-tabs" role="tablist" aria-label="카테고리">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={categoryTab === tab}
                className={categoryTab === tab ? 'tab active' : 'tab'}
                onClick={() => handleCategoryTabChange(tab)}
              >
                {tab}
                <span className="tab-count">{categoryCounts[tab]}</span>
              </button>
            ))}
          </div>
          <div className="category-tab-filters">
            <ToggleSwitch
              label="상품재고"
              checked={productStockOnly}
              onChange={setProductStockOnly}
            />
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
          activeCategory={categoryTab}
          onSelect={selectProduct}
        />
      </div>

      {/* ── 2. 상품 REST API CRUD 폼 ── */}
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

      {/* ── 3. 품목 REST API CRUD 폼 (상품 선택 시에만) ── */}
      {selectedProductId && selectedProductName && (
        <>
          <section className="section-panel">
            <h2 className="section-title">
              품목 API · /api/products/{selectedProductId}/models
            </h2>
            <div className="form-panel">
              <label>
                품목명
                <input
                  value={modelForm.modelName}
                  onChange={(e) => setModelForm({ ...modelForm, modelName: e.target.value })}
                />
              </label>
              <label>
                품목코드
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
        </>
      )}

      {/* ── 4. AG Grid (화면 최하단, 시작 시 전체 품목 표시) ── */}
      <ProductModelGrid
        title={gridTitle}
        models={gridModels}
        highlightedModelId={highlightedModelId}
        loading={modelsLoading || detailLoading}
        showProductColumn={!selectedProductId}
        onSelect={openModelDetail}
      />

      {/* ── 5. 품목 상세 Modal (overlay) ── */}
      {detailModel && (
        <ModelDetailModal
          productName={detailProductName}
          model={detailModel}
          onClose={closeModelDetail}
          onEdit={editModelFromDetail}
        />
      )}
    </div>
  );
}

export default App;
