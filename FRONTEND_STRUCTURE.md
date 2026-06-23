# Frontend 상세 구조

React + JavaScript + Vite + AG Grid 기반 SPA입니다.

> **작업 가이드: [FRONTEND_작업지시서.md](./FRONTEND_작업지시서.md)** · **전체 구조: [PROJECT_구조_상세.md](./PROJECT_구조_상세.md)**
---

## 1. 파일 역할 한눈에 보기

| 파일 | 한 줄 설명 |
|------|-----------|
| `main.jsx` | React 앱을 `#root`에 마운트 |
| `App.jsx` | 전체 화면·상태·이벤트의 중심 |
| `api.js` | Backend REST API 호출 (fetch) |
| `hooks/useProducts.js` | 상품 목록/CRUD 상태 |
| `hooks/useProductModels.js` | 품목 목록/CRUD 상태 |
| `utils/productForm.js` | 상품 폼 ↔ API 데이터 변환 |
| `utils/modelForm.js` | 품목 폼 ↔ API 데이터 변환 |
| `components/ProductCardGrid.jsx` | Tab 조회 결과 → 아이콘 카드, 펼침/접힘 |
| `components/ProductModelGrid.jsx` | AG Grid 품목 테이블 |
| `components/ModelDetailModal.jsx` | 품목 상세 팝업 |
| `components/ToggleSwitch.jsx` | 재고 필터 / 항상 펼침 스위치 |
| `index.css` | className 스타일 |
| `vite.config.js` | dev 서버 + API 프록시 |

---

## 2. App.jsx 화면 구성 (위 → 아래)

```
┌──────────────────────────────────────┐
│ 제목 + 에러 메시지                      │
├──────────────────────────────────────┤
│ 1. Tab (전체/전자기기/가구) + 토글 필터   │
│    ProductCardGrid (상품 카드)          │
├──────────────────────────────────────┤
│ 2. 상품 API CRUD 폼                    │
├──────────────────────────────────────┤
│ 3. 품목 API CRUD 폼 (상품 선택 시)       │
├──────────────────────────────────────┤
│ 4. ProductModelGrid (AG Grid) ← 최하단 │
├──────────────────────────────────────┤
│ 5. ModelDetailModal (overlay)        │
└──────────────────────────────────────┘
```

---

## 3. 상태(State) 정리

### Hook에서 관리 (`useProducts`, `useProductModels`)

| 상태 | 설명 |
|------|------|
| `products` | 상품 전체 배열 |
| `models` | 현재 Grid에 표시할 품목 배열 |
| `loading` | API 로딩 중 |
| `error` | API 오류 메시지 |

### App.jsx 로컬 state

| state | 설명 |
|-------|------|
| `categoryTab` | 선택된 Tab (전체/전자기기/가구) |
| `productStockOnly` | 상품 재고 > 0 필터 |
| `alwaysExpanded` | 상품 카드 그룹 항상 펼침 여부 |
| `selectedProductId` | 클릭한 상품 ID |
| `productForm` / `modelForm` | CRUD 입력값 |
| `detailModel` | Modal에 표시할 품목 |

---

## 4. useMemo / useEffect

| 이름 | 역할 |
|------|------|
| `products` | API로 조회한 현재 Tab의 상품 카드 목록 |
| `gridModels` | Grid용 productName 컬럼 추가 |
| `categories` | API로 조회한 Tab 이름과 개수 뱃지 |
| mount `useEffect` | 시작 시 전체 Tab + 상품 로드 |
| models `useEffect` | 상품 미선택 시 전체 품목 Grid 로드 |

---

## 5. API 호출 경로

브라우저 → `fetch('/api/products')` → Vite proxy → `http://localhost:8081/api/products`

```javascript
// api.js
productsApi.categories()                // GET  /api/products/categories
productsApi.list({ category })          // GET  /api/products?category=...
productsApi.get(id)                     // GET  /api/products/{id}
productModelsApi.list(pid)              // GET  /api/products/{pid}/models
```

---

## 6. 컴ponent Props

### ProductCardGrid

| Prop | 타입 | 설명 |
|------|------|------|
| products | Product[] | 표시할 상품 |
| selectedId | number \| null | 선택된 카드 강조 |
| loading | boolean | 로딩 UI |
| activeCategory | Tab | 안내 문구용 |
| expanded | boolean | 전체 카드 펼침 여부 |
| onToggleExpanded | () => void | 하단 펼침/접기 버튼 클릭 |
| onSelect | (product) => void | 카드 클릭 |

### ProductModelGrid

| Prop | 타입 | 설명 |
|------|------|------|
| title | string | 패널 제목 (전체/상품명) |
| models | ProductModelRow[] | Grid rowData |
| showProductColumn | boolean | 상품명 컬럼 표시 |
| onSelect | (model) => void | 행 클릭 → Modal |

---

## 7. AG Grid 설정 요약

- 라이브러리: `ag-grid-react` + `ag-theme-quartz`
- `domLayout="autoHeight"`: 행 수에 맞게 높이 자동
- `onRowClicked`: 행 클릭 이벤트
- `columnDefs`: 컬럼 정의 (useMemo로 최적화)

---

## 8. 개발 팁

1. **Backend 먼저 실행** — Frontend만 켜면 `Backend에 연결할 수 없습니다` 에러
2. **HMR** — 코드 저장 시 화면 자동 갱신 (Vite)
3. **주석** — 각 `.js`/`.jsx` 파일 상단에 역할 설명 있음
4. **빌드** — `npm run build` → `dist/` 폴더 생성

---

## 9. 의존성 (package.json 주요)

| 패키지 | 용도 |
|--------|------|
| react, react-dom | UI |
| ag-grid-react, ag-grid-community | Grid |
| vite, @vitejs/plugin-react | 빌드·dev 서버 |
