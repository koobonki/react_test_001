import type { ProductModel } from '../api';
import type { ProductModelPayload } from '../api';

/** 모델 폼 초기값 */
export const emptyModelForm: ProductModelPayload = {
  modelName: '',
  modelCode: '',
  price: 0,
  stock: 0,
};

/** ProductModel → 폼 payload 변환 */
export function toModelForm(model: ProductModel): ProductModelPayload {
  return {
    modelName: model.modelName,
    modelCode: model.modelCode,
    price: model.price,
    stock: model.stock,
  };
}
