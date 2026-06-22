/**
 * 품목 CRUD 폼용 유틸.
 */

/** 신규 품목 등록 시 빈 폼 */
export const emptyModelForm = {
  modelName: '',
  modelCode: '',
  price: 0,
  stock: 0,
};

/** API 품목 → 폼 입력값 */
export function toModelForm(model) {
  return {
    modelName: model.modelName,
    modelCode: model.modelCode,
    price: model.price,
    stock: model.stock,
  };
}
