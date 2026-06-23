/**
 * Backend REST API 호출 모듈.
 *
 * Frontend(Vite)는 /api 로 시작하는 요청을 vite.config.js 프록시를 통해
 * Spring Boot(localhost:8081)로 전달합니다.
 *
 * 사용 예:
 *   const list = await productsApi.list();
 *   await productModelsApi.create(productId, { modelName, ... });
 */

const JSON_HEADERS = { 'Content-Type': 'application/json' };

/**
 * ProductCardGrid에 넣을 상품 목록 API URL을 만듭니다.
 *
 * 화면 조건별 URL:
 * - 전체 Tab: /api/products
 * - 전자기기 Tab: /api/products?category=전자기기
 * - 가구 Tab + 상품재고 ON: /api/products?category=가구&inStockOnly=true
 *
 * 이 URL은 Backend ProductController.findAll()로 들어가고,
 * Backend는 products 테이블에서 category / stock 조건을 적용해 조회합니다.
 */
function productListUrl({ category, inStockOnly } = {}) {
  const params = new URLSearchParams();
  if (category && category !== '전체') params.set('category', category);
  if (inStockOnly) params.set('inStockOnly', 'true');

  const query = params.toString();
  return query ? `/api/products?${query}` : '/api/products';
}

/**
 * 화면 상단 category Tab 목록 API URL을 만듭니다.
 *
 * 이 API는 별도 category 테이블을 읽는 것이 아니라,
 * Backend에서 products.category 값을 모아서 [{ name, count }] 형태로 내려줍니다.
 * "상품재고" 토글이 ON이면 Tab count도 stock > 0 상품 기준으로 다시 계산됩니다.
 */
function categoryListUrl({ inStockOnly } = {}) {
  const params = new URLSearchParams();
  if (inStockOnly) params.set('inStockOnly', 'true');

  const query = params.toString();
  return query ? `/api/products/categories?${query}` : '/api/products/categories';
}

/**
 * fetch 공통 래퍼.
 * - 네트워크 오류 → Backend 미실행 안내
 * - HTTP 4xx/5xx → errorMessage + 서버 message
 * - 204 No Content → undefined
 */
async function request(url, options, errorMessage = '요청에 실패했습니다.') {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('Backend에 연결할 수 없습니다. (8081에서 실행 중인지 확인하세요)');
  }

  if (!response.ok) {
    let detail = '';
    try {
      const body = await response.json();
      if (body?.message) detail = `: ${body.message}`;
    } catch {
      // JSON이 아닌 에러 응답은 무시
    }
    throw new Error(`${errorMessage}${detail}`);
  }

  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return undefined;
  }

  return response.json();
}

/** /api/products CRUD */
export const productsApi = {
  /** ProductCardGrid 카드 목록 조회 */
  list(options) {
    return request(productListUrl(options), undefined, '상품 목록을 불러오지 못했습니다.');
  },
  /** category Tab 버튼 목록 조회 */
  categories(options) {
    return request(categoryListUrl(options), undefined, '카테고리 목록을 불러오지 못했습니다.');
  },
  get(id) {
    return request(`/api/products/${id}`, undefined, '상품을 불러오지 못했습니다.');
  },
  create(product) {
    return request('/api/products', { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(product) }, '상품 등록에 실패했습니다.');
  },
  update(id, product) {
    return request(`/api/products/${id}`, { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(product) }, '상품 수정에 실패했습니다.');
  },
  delete(id) {
    return request(`/api/products/${id}`, { method: 'DELETE' }, '상품 삭제에 실패했습니다.');
  },
};

/** /api/products/{productId}/models CRUD */
export const productModelsApi = {
  list(productId) {
    return request(`/api/products/${productId}/models`, undefined, '모델 목록을 불러오지 못했습니다.');
  },
  get(productId, id) {
    return request(`/api/products/${productId}/models/${id}`, undefined, '모델을 불러오지 못했습니다.');
  },
  create(productId, model) {
    return request(`/api/products/${productId}/models`, { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(model) }, '모델 등록에 실패했습니다.');
  },
  update(productId, id, model) {
    return request(`/api/products/${productId}/models/${id}`, { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(model) }, '모델 수정에 실패했습니다.');
  },
  delete(productId, id) {
    return request(`/api/products/${productId}/models/${id}`, { method: 'DELETE' }, '모델 삭제에 실패했습니다.');
  },
};

// 하위 호환용 별칭 (예전 import 경로)
export const fetchProducts = productsApi.list;
export const createProduct = productsApi.create;
export const updateProduct = productsApi.update;
export const deleteProduct = productsApi.delete;
