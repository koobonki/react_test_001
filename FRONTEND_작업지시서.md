# Frontend 작업지시서

React 18 + JavaScript + Vite + AG Grid 기반 SPA 개발·운영 가이드입니다.

> 구조 상세: [PROJECT_구조_상세.md](./PROJECT_구조_상세.md) · Backend 작업: [BACKEND_작업지시서.md](./BACKEND_작업지시서.md)

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **역할** | 상품·품목 UI, REST API 연동, AG Grid 표시 |
| **IDE** | Visual Studio Code (권장) |
| **Node.js** | 18+ |
| **포트** | 5173 |
| **API 프록시** | `/api` → `http://localhost:8081` |

---

## 2. 개발 환경 세팅

### 2.1 사전 설치

- Node.js 18+
- Visual Studio Code
- Git

### 2.2 프로젝트 열기

```powershell
git clone https://github.com/koobonki/react_test_001.git
cd react_test_001/frontend
npm install
```

1. VS Code → **Open Folder** → `frontend` 선택
2. 추천 확장 프로그램 설치 (`.vscode/extensions.json` 안내)

### 2.3 실행

| 방법 | 절차 |
|------|------|
| **터미널** | `npm run dev` |
| **VS Code Task** | Terminal → Run Task → **npm: dev** |
| **Debug (F5)** | Run and Debug → **Frontend: Chrome (5173)** |

### 2.4 동작 확인

- UI: http://localhost:5173
- **Backend(IntelliJ)를 먼저 실행**해야 API 데이터가 표시됩니다.

---

## 3. 디렉터리 및 파일 역할

```
frontend/
├── package.json              # 의존성·npm scripts
├── vite.config.js            # dev 서버 5173, /api 프록시
├── index.html                # HTML 진입점
├── .vscode/
│   ├── tasks.json            # npm install / dev / build
│   ├── launch.json           # Chrome 디버그
│   ├── extensions.json       # 추천 확장
│   └── settings.json         # 포맷 등
└── src/
    ├── main.jsx              # React 마운트
    ├── App.jsx               # ★ 메인 UI·상태·이벤트
    ├── api.js                # REST API 클라이언트
    ├── index.css             # 전역 CSS
    ├── hooks/
    │   ├── useProducts.js        # 상품 API Hook
    │   └── useProductModels.js   # 품목 API Hook
    ├── utils/
    │   ├── productForm.js        # 상품 폼 변환
    │   └── modelForm.js          # 품목 폼 변환
    └── components/
        ├── ProductCardGrid.jsx   # 상품 카드 (Tab 필터)
        ├── ProductModelGrid.jsx  # AG Grid
        ├── ModelDetailModal.jsx  # 품목 상세 Modal
        └── ToggleSwitch.jsx      # 재고 필터 스위치
```

---

## 4. 화면 구성 (App.jsx)

```
┌─────────────────────────────────────┐
│ 1. Tab + 상품 카드 (ProductCardGrid) │
├─────────────────────────────────────┤
│ 2. 상품 CRUD 폼                      │
├─────────────────────────────────────┤
│ 3. 품목 CRUD 폼 (상품 선택 시)        │
├─────────────────────────────────────┤
│ 4. AG Grid (ProductModelGrid)       │
├─────────────────────────────────────┤
│ 5. Modal (ModelDetailModal)         │
└─────────────────────────────────────┘
```

---

## 5. 레이어별 작업 가이드

### 5.1 API 함수 추가 (`api.js`)

Backend API가 추가되면:

1. `productsApi` / `productModelsApi`에 메서드 추가
2. `request()` 공통 함수 재사용
3. Hook 또는 App에서 새 API 함수 호출

```javascript
// 예: 카테고리별 조회
export const productsApi = {
  listByCategory(category) {
    return request(`/api/products/by-category/${category}`, undefined, '조회 실패');
  },
};
```

### 5.2 Custom Hook 추가/수정 (`hooks/`)

**패턴**

- `useState`: data, loading, error
- `useCallback`: API 호출 함수
- Hook 반환값을 `App.jsx`에서 destructuring

**예: useProducts에 search 추가**

```javascript
const search = useCallback(async (keyword) => {
  setLoading(true);
  try {
    setProducts(await productsApi.search(keyword));
  } finally {
    setLoading(false);
  }
}, []);
```

### 5.3 UI 컴ponent 추가 (`components/`)

- Props는 함수 매개변수 destructuring으로 받기
- 파일 상단에 컴포넌트 역할 주석
- 스타일은 `index.css`에 className으로 추가 (인라인 최소화)

### 5.4 App.jsx 상태·이벤트

| 작업 | 수정 위치 |
|------|----------|
| Tab 카테고리 추가 | Backend category API + `productsApi.categories()` |
| 필터 추가 | state + `useMemo` + `ToggleSwitch` |
| 새 API 연동 | Hook 호출 + `useEffect` |
| 폼 CRUD | `handleProductSubmit`, `handleModelSubmit` |

### 5.5 AG Grid 컬럼 추가

`ProductModelGrid.jsx` → `columnDefs` 배열에 컬럼 정의 추가:

```javascript
{ field: 'newField', headerName: '새 컬럼', width: 120 }
```

`gridModels` useMemo에서 Backend 필드 → row 데이터 매핑 확인.

---

## 6. 데이터 흐름 (필독)

### 앱 시작

```
App mount
  → useProducts.load()           → GET /api/products
  → loadAllForProducts()         → GET /api/products/{id}/models (전체)
  → categoryTab = '전체'
  → ProductCardGrid + AG Grid 표시
```

### 상품 카드 클릭

```
selectProduct(product)
  → selectedProductId 설정
  → getProductById → 상품 폼 채움
  → loadModels(productId) → 해당 상품 품목만 Grid
```

### AG Grid 행 클릭

```
openModelDetail(model)
  → getModelById(productId, modelId)
  → ModelDetailModal 표시
```

---

## 7. 주요 State 정리

| State | 위치 | 설명 |
|-------|------|------|
| `products` | useProducts | API 상품 목록 |
| `models` | useProductModels | Grid 품목 목록 |
| `categoryTab` | App | 전체/전자기기/가구 |
| `productStockOnly` | App | 재고 > 0 상품 필터 |
| `modelStock10Plus` | App | 재고 ≥ 10 품목 필터 |
| `selectedProductId` | App | 선택된 상품 |
| `productForm` / `modelForm` | App | CRUD 입력값 |
| `detailModel` | App | Modal 표시 품목 |

---

## 8. npm Scripts

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 (5173) |
| `npm run build` | Vite production build (`dist/`) |
| `npm run preview` | 빌드 결과 미리보기 |

---

## 9. 작업 체크리스트

### UI 기능 추가 시

- [ ] Backend API 존재·동작 확인
- [ ] `api.js` 함수 추가
- [ ] Hook 또는 App state 연동
- [ ] Component 분리 (재사용 가능하면 `components/`)
- [ ] `index.css` 스타일 추가
- [ ] Backend 실행 상태에서 브라우저 테스트

### 배포·공유 전

- [ ] `npm run build` 성공
- [ ] Backend(8081) + Frontend(5173) 연동 확인
- [ ] Tab / Grid / Modal / CRUD 시나리오 테스트

---

## 10. 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| Backend에 연결할 수 없습니다 | Backend 미실행 | IntelliJ DemoApplication 실행 |
| Grid 비어 있음 | API 오류 / DB 없음 | Network 탭, 8081 API 확인 |
| Tab 필터 안 됨 | category 빈 값 | H2 / API 응답 category 확인 |
| HMR 후 상태 이상 | 개발 중 state 잔존 | 브라우저 새로고침 (F5) |
| proxy ECONNREFUSED | Backend 다운 | 8081 확인 |

---

## 11. 코딩 Convention

| 항목 | 규칙 |
|------|------|
| 파일명 | PascalCase (컴ponent), camelCase (hook/util) |
| Hook | `use` 접두사 필수 |
| API | `productsApi`, `productModelsApi` 객체로 그룹화 |
| 데이터 | API 응답 필드명은 Backend JSON과 동일하게 유지 |
| 주석 | 파일 상단 + App.jsx 섹션 주석 (한국어) |
| CSS | `index.css`, BEM 유사 className |

---

## 12. VS Code 단축키·Task

| 작업 | 방법 |
|------|------|
| Task 실행 | `Ctrl+Shift+P` → "Tasks: Run Task" |
| Debug | `F5` (Frontend: Chrome) |
| 터미널 | `` Ctrl+` `` |

---

## 13. 관련 문서

| 문서 | 내용 |
|------|------|
| [PROJECT_구조_상세.md](./PROJECT_구조_상세.md) | 전체 아키텍처·시퀀스 |
| [BACKEND_작업지시서.md](./BACKEND_작업지시서.md) | Backend API 개발 |
| [frontend/README.md](./frontend/README.md) | VS Code 빠른 시작 |
| [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md) | Frontend 파일 요약 |
