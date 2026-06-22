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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductCardGrid } from './components/ProductCardGrid';
import { ProductModelGrid } from './components/ProductModelGrid';
import { ModelDetailModal } from './components/ModelDetailModal';
import { ToggleSwitch } from './components/ToggleSwitch';
import { useProducts } from './hooks/useProducts';
import { useProductModels } from './hooks/useProductModels';
import { emptyProductForm, toProductForm } from './utils/productForm';
import { emptyModelForm, toModelForm } from './utils/modelForm';

function App() {
  // ── API Hooks: Backend 호출 로직을 컴포넌트 밖으로 분리 ──
  const {
    products,
    categories,
    loading: productsLoading,
    categoriesLoading,
    error: productsError,
    setError: setProductsError,
    load: loadProducts,
    loadCategories,
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
  const categoryTabs = categories.length > 0 ? categories : [{ name: '전체', count: products.length }];

  const refreshProductQueries = useCallback(async () => {
    await Promise.all([
      loadCategories({ inStockOnly: productStockOnly }),
      loadProducts({ category: categoryTab, inStockOnly: productStockOnly }),
    ]);
  }, [categoryTab, productStockOnly, loadCategories, loadProducts]);

  /** 선택된 Tab/재고 필터가 바뀔 때마다 API에서 Tab 목록과 카드 목록을 다시 조회합니다. */
  useEffect(() => {
    refreshProductQueries();
  }, [refreshProductQueries]);

  /** 상품 선택 없을 때 — API로 조회한 카드 목록의 품목을 AG Grid에 표시 */
  useEffect(() => {
    if (productsLoading || selectedProductId) return;
    loadAllForProducts(products);
  }, [productsLoading, selectedProductId, products, loadAllForProducts]);

  /** 현재 선택된 카테고리가 API Tab 목록에서 사라지면 전체 Tab으로 복귀합니다. */
  useEffect(() => {
    if (categoriesLoading || categoryTab === '전체') return;
    if (!categories.some((category) => category.name === categoryTab)) {
      setCategoryTab('전체');
      resetProductForm();
    }
  }, [categories, categoriesLoading, categoryTab]);

  const handleCategoryTabChange = (tab) => {
    if (tab === categoryTab) return;
    setCategoryTab(tab);
    resetProductForm();
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
        await refreshProductQueries();
      } else {
        await createProduct(productForm);
        resetProductForm();
        await refreshProductQueries();
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
      await refreshProductQueries();
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
            {categoryTabs.map((tab) => (
              <button
                key={tab.name}
                type="button"
                role="tab"
                aria-selected={categoryTab === tab.name}
                className={categoryTab === tab.name ? 'tab active' : 'tab'}
                disabled={categoriesLoading}
                onClick={() => handleCategoryTabChange(tab.name)}
              >
                {tab.name}
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="category-tab-filters">
            <ToggleSwitch
              label="상품재고"
              checked={productStockOnly}
              onChange={(checked) => {
                setProductStockOnly(checked);
                resetProductForm();
              }}
            />
            <ToggleSwitch
              label="재고10개 이상"
              checked={modelStock10Plus}
              onChange={setModelStock10Plus}
            />
          </div>
        </div>
        <ProductCardGrid
          products={products}
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
          <button className="secondary" onClick={() => refreshProductQueries()}>
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
