/**
 * Backend REST API 호출 모듈.
 *
 * Frontend(Vite)는 /api 로 시작하는 요청을 vite.config.ts 프록시를 통해
 * Spring Boot(localhost:8081)로 전달합니다.
 *
 * 사용 예:
 *   const list = await productsApi.list();
 *   await productModelsApi.create(productId, { modelName, ... });
 */

/** 상품 1건의 타입 (Backend Product Entity와 JSON 필드명이 같음) */
export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

/** 품목 1건의 타입 (상품 하위 SKU) */
export interface ProductModel {
  id?: number;
  productId?: number; // Backend getProductId()로 내려옴
  modelName: string;
  modelCode: string;
  price: number;
  stock: number;
}

/** POST/PUT 시 id 없이 보내는 상품 데이터 */
export type ProductPayload = Omit<Product, 'id'>;
/** POST/PUT 시 id, productId 없이 보내는 품목 데이터 */
export type ProductModelPayload = Omit<ProductModel, 'id' | 'productId'>;

const JSON_HEADERS = { 'Content-Type': 'application/json' };

/**
 * fetch 공통 래퍼.
 * - 네트워크 오류 → Backend 미실행 안내
 * - HTTP 4xx/5xx → errorMessage + 서버 message
 * - 204 No Content → undefined
 */
async function request<T>(url: string, options?: RequestInit, errorMessage = '요청에 실패했습니다.'): Promise<T> {
  let response: Response;
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
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

/** /api/products CRUD */
export const productsApi = {
  list(): Promise<Product[]> {
    return request('/api/products', undefined, '상품 목록을 불러오지 못했습니다.');
  },
  get(id: number): Promise<Product> {
    return request(`/api/products/${id}`, undefined, '상품을 불러오지 못했습니다.');
  },
  create(product: ProductPayload): Promise<Product> {
    return request('/api/products', { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(product) }, '상품 등록에 실패했습니다.');
  },
  update(id: number, product: ProductPayload): Promise<Product> {
    return request(`/api/products/${id}`, { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(product) }, '상품 수정에 실패했습니다.');
  },
  delete(id: number): Promise<void> {
    return request(`/api/products/${id}`, { method: 'DELETE' }, '상품 삭제에 실패했습니다.');
  },
};

/** /api/products/{productId}/models CRUD */
export const productModelsApi = {
  list(productId: number): Promise<ProductModel[]> {
    return request(`/api/products/${productId}/models`, undefined, '모델 목록을 불러오지 못했습니다.');
  },
  get(productId: number, id: number): Promise<ProductModel> {
    return request(`/api/products/${productId}/models/${id}`, undefined, '모델을 불러오지 못했습니다.');
  },
  create(productId: number, model: ProductModelPayload): Promise<ProductModel> {
    return request(`/api/products/${productId}/models`, { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(model) }, '모델 등록에 실패했습니다.');
  },
  update(productId: number, id: number, model: ProductModelPayload): Promise<ProductModel> {
    return request(`/api/products/${productId}/models/${id}`, { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(model) }, '모델 수정에 실패했습니다.');
  },
  delete(productId: number, id: number): Promise<void> {
    return request(`/api/products/${productId}/models/${id}`, { method: 'DELETE' }, '모델 삭제에 실패했습니다.');
  },
};

// 하위 호환용 별칭 (예전 import 경로)
export const fetchProducts = productsApi.list;
export const createProduct = productsApi.create;
export const updateProduct = productsApi.update;
export const deleteProduct = productsApi.delete;
