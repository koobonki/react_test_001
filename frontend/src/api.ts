/**
 * Backend REST API 호출 모듈.
 * fetch를 사용해 /api/** 경로로 HTTP 요청을 보냅니다.
 * (개발 시 Vite가 8080 포트로 프록시해 줍니다)
 */

/** 상품 데이터 타입 — Backend Product Entity와 JSON 필드가 같습니다 */
export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

/** 모델 데이터 타입 — Backend ProductModel Entity와 JSON 필드가 같습니다 */
export interface ProductModel {
  id?: number;
  productId?: number;
  modelName: string;
  modelCode: string;
  price: number;
  stock: number;
}

/** 등록/수정 시 id를 제외한 payload 타입 */
export type ProductPayload = Omit<Product, 'id'>;
export type ProductModelPayload = Omit<ProductModel, 'id' | 'productId'>;

const JSON_HEADERS = { 'Content-Type': 'application/json' };

/**
 * 공통 HTTP 요청 함수.
 * - response.ok가 false면 Error throw
 * - 204 No Content면 undefined 반환 (DELETE 등)
 */
async function request<T>(url: string, options?: RequestInit, errorMessage = '요청에 실패했습니다.'): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    // Backend 404/400 등의 메시지가 있으면 함께 표시
    let detail = '';
    try {
      const body = await response.json();
      if (body?.message) detail = `: ${body.message}`;
    } catch {
      // JSON body가 없는 경우 무시
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

/** 상품 CRUD API — /api/products */
export const productsApi = {
  /** GET /api/products */
  list(): Promise<Product[]> {
    return request('/api/products', undefined, '상품 목록을 불러오지 못했습니다.');
  },

  /** GET /api/products/{id} */
  get(id: number): Promise<Product> {
    return request(`/api/products/${id}`, undefined, '상품을 불러오지 못했습니다.');
  },

  /** POST /api/products */
  create(product: ProductPayload): Promise<Product> {
    return request(
      '/api/products',
      { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(product) },
      '상품 등록에 실패했습니다.',
    );
  },

  /** PUT /api/products/{id} */
  update(id: number, product: ProductPayload): Promise<Product> {
    return request(
      `/api/products/${id}`,
      { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(product) },
      '상품 수정에 실패했습니다.',
    );
  },

  /** DELETE /api/products/{id} */
  delete(id: number): Promise<void> {
    return request(
      `/api/products/${id}`,
      { method: 'DELETE' },
      '상품 삭제에 실패했습니다.',
    );
  },
};

/** 모델 CRUD API — /api/products/{productId}/models */
export const productModelsApi = {
  /** GET /api/products/{productId}/models */
  list(productId: number): Promise<ProductModel[]> {
    return request(
      `/api/products/${productId}/models`,
      undefined,
      '모델 목록을 불러오지 못했습니다.',
    );
  },

  /** GET /api/products/{productId}/models/{id} */
  get(productId: number, id: number): Promise<ProductModel> {
    return request(
      `/api/products/${productId}/models/${id}`,
      undefined,
      '모델을 불러오지 못했습니다.',
    );
  },

  /** POST /api/products/{productId}/models */
  create(productId: number, model: ProductModelPayload): Promise<ProductModel> {
    return request(
      `/api/products/${productId}/models`,
      { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(model) },
      '모델 등록에 실패했습니다.',
    );
  },

  /** PUT /api/products/{productId}/models/{id} */
  update(productId: number, id: number, model: ProductModelPayload): Promise<ProductModel> {
    return request(
      `/api/products/${productId}/models/${id}`,
      { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(model) },
      '모델 수정에 실패했습니다.',
    );
  },

  /** DELETE /api/products/{productId}/models/{id} */
  delete(productId: number, id: number): Promise<void> {
    return request(
      `/api/products/${productId}/models/${id}`,
      { method: 'DELETE' },
      '모델 삭제에 실패했습니다.',
    );
  },
};

// 예전 함수 이름과의 호환용 (다른 파일에서 import할 수 있음)
export const fetchProducts = productsApi.list;
export const createProduct = productsApi.create;
export const updateProduct = productsApi.update;
export const deleteProduct = productsApi.delete;
export const fetchProductModels = productModelsApi.list;
