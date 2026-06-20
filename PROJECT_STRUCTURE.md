# 프로젝트 구조 설명

Spring Boot 3 + React 풀스택 상품/모델 관리 데모 프로젝트입니다.

---

## 1. 전체 구성

```
(test)20260619_react/
├── README.md                 # 실행 가이드
├── PROJECT_STRUCTURE.md      # 본 문서
├── docker-compose.yml        # PostgreSQL (선택)
├── docker/postgres/init/     # PostgreSQL 초기 SQL
├── backend/                  # Spring Boot REST API
└── frontend/                 # React SPA
```

| 구분 | 기술 | 포트 |
|------|------|------|
| Frontend | React 18, TypeScript, Vite, AG Grid | 5173 |
| Backend | Spring Boot 3.2.5, JPA, Java 17 | 8080 |
| DB (기본) | H2 파일 DB | 내장 |
| DB (선택) | PostgreSQL 16 (Docker) | 5432 |

---

## 2. Backend 구조

```
backend/
├── build.gradle              # Gradle 빌드 설정
├── settings.gradle
├── gradlew.bat               # Gradle Wrapper
├── gradle/wrapper/
├── data/                     # H2 DB 파일 (실행 시 생성)
├── db/schema.sql             # 스키마 참고 SQL
├── scripts/
│   ├── init-db.cmd           # H2 DB 정보/초기화
│   ├── init-db.ps1
│   └── start-postgres-db.cmd
└── src/main/
    ├── java/com/example/demo/
    │   ├── DemoApplication.java
    │   ├── config/
    │   │   └── WebConfig.java          # CORS
    │   └── product/
    │       ├── Product.java            # 상품 Entity
    │       ├── ProductModel.java       # 모델 Entity
    │       ├── ProductRepository.java
    │       ├── ProductModelRepository.java
    │       ├── ProductController.java
    │       └── ProductModelController.java
    └── resources/
        ├── application.yml
        ├── application-h2.yml          # 기본 DB 프로필
        ├── application-postgres.yml
        └── db/
            ├── data.sql                # 상품 5건
            └── data-models.sql         # 모델 25건
```

### 레이어

| 레이어 | 파일 | 역할 |
|--------|------|------|
| Controller | `ProductController`, `ProductModelController` | REST API |
| Repository | `ProductRepository`, `ProductModelRepository` | DB 접근 |
| Entity | `Product`, `ProductModel` | JPA 엔티티 |

### DB 테이블

**products** (상품)
- id, name, category, price, stock

**product_models** (모델)
- id, product_id (FK), model_name, model_code, price, stock
- 상품 1개 : 모델 N개 (1:N)

### REST API

**상품** `/api/products`

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/products` | 전체 조회 |
| GET | `/api/products/{id}` | 단건 조회 |
| POST | `/api/products` | 등록 |
| PUT | `/api/products/{id}` | 수정 |
| DELETE | `/api/products/{id}` | 삭제 |

**모델** `/api/products/{productId}/models`

| Method | URL | 설명 |
|--------|-----|------|
| GET | `.../models` | 목록 조회 |
| GET | `.../models/{id}` | 단건 조회 |
| POST | `.../models` | 등록 |
| PUT | `.../models/{id}` | 수정 |
| DELETE | `.../models/{id}` | 삭제 |

---

## 3. Frontend 구조

```
frontend/
├── package.json
├── vite.config.ts            # /api → localhost:8080 프록시
├── index.html
├── .vscode/tasks.json        # dev 실행 Task
├── scripts/                  # dev 실행 스크립트
└── src/
    ├── main.tsx              # React 진입점
    ├── App.tsx               # 메인 UI + 상태 조합 (hooks 사용)
    ├── api.ts                # REST API 클라이언트 + 타입
    ├── index.css
    ├── hooks/
    │   ├── useProducts.ts        # 상품 목록/CRUD Hook
    │   └── useProductModels.ts   # 모델 목록/CRUD/상세 Hook
    ├── utils/
    │   ├── productForm.ts        # 상품 폼 초기값·변환
    │   └── modelForm.ts          # 모델 폼 초기값·변환
    └── components/
        ├── ProductCardGrid.tsx   # 상품 카드 (Tab 필터, 5열)
        ├── ProductModelGrid.tsx  # 모델 AG Grid
        ├── ModelDetailModal.tsx  # 모델 상세 Modal
        └── ToggleSwitch.tsx      # 재고 필터 토글 스위치
```

### 화면 흐름

1. **카테고리 Tab** (전체 / 전자기기 / 가구) → 상품 카드 필터
2. **상품재고 토글** (Tab 우측) → ON: `stock > 0` 상품만 카드 표시
3. **상품 카드 클릭** → `GET /api/products/{id}` + `GET .../models` → 상품 폼 + 모델 AG Grid
4. **재고10개 이상 토글** (Tab 우측) → ON: `stock >= 10` 모델만 Grid 표시
5. **AG Grid 행 클릭** → `GET .../models/{id}` → **ModelDetailModal** (상세 Modal)
6. Modal **"수정하기"** → Modal 닫힘 + 하단 모델 CRUD 폼에 데이터 로드
7. Modal **"닫기"** / 배경 클릭 / X 버튼 → Modal 닫힘
8. **POST/PUT/DELETE 버튼** → REST API 호출

### 재고 필터 토글

카테고리 Tab **가장 우측**에 두 개의 토글 스위치가 있습니다.  
Backend API를 추가로 호출하지 않고, 이미 불러온 목록을 **클라이언트에서 필터**합니다.

| 토글 | state | ON (켜짐) | OFF (꺼짐) | 적용 대상 |
|------|-------|-----------|------------|-----------|
| **상품재고** | `productStockOnly` | `stock > 0` 상품만 | 전체 상품 | `ProductCardGrid` (`filteredProducts`) |
| **재고10개 이상** | `modelStock10Plus` | `stock >= 10` 모델만 | 전체 모델 | `ProductModelGrid` (`filteredModels`) |

| 항목 | 설명 |
|------|------|
| 파일 | `src/components/ToggleSwitch.tsx` |
| 배치 | `App.tsx` → `.category-tabs-bar` 내부 `.category-tab-filters` |
| 필터 로직 | `App.tsx`의 `filteredProducts`, `filteredModels` (`useMemo`) |
| 스타일 | `index.css` → `.category-tabs-bar`, `.toggle-switch` |

```
[상품재고 ON]
  → filteredProducts = 카테고리 Tab 결과 ∩ (stock > 0)
  → ProductCardGrid에 전달

[재고10개 이상 ON]
  → filteredModels = models.filter(stock >= 10)
  → ProductModelGrid에 전달 (상품 선택 후)
```

### 모델 상세 Modal

| 항목 | 설명 |
|------|------|
| 파일 | `src/components/ModelDetailModal.tsx` |
| 트리거 | AG Grid 행 클릭 (`ProductModelGrid` → `App.openModelDetail`) |
| state | `detailModel` (Modal), `editingModelId` (폼 수정 모드) — 분리 |
| API | Modal: `productModelsApi.get(productId, id)` / 선택: `productsApi.get(id)` |
| 표시 정보 | 상품명, 모델 ID, 모델코드, 가격, 재고 |
| 닫기 | overlay 클릭, X 버튼, "닫기" 버튼 |
| 수정 연계 | "수정하기" → `editModelFromDetail()` → CRUD 폼으로 이동 |

```
[상품 카드 클릭]
  → selectProduct(product)
  → productsApi.get(id) + productModelsApi.list(productId)

[AG Grid 행 클릭]
  → openModelDetail(model)
  → productModelsApi.get(productId, modelId)
  → setDetailModel(detail)
  → ModelDetailModal 렌더링

[수정하기 클릭]
  → editModelFromDetail()
  → setEditingModelId + setModelForm(...) + setDetailModel(null)
  → 하단 폼에서 PUT 수정 가능
```

### API 클라이언트 (`api.ts`) + Hooks

```typescript
// api.ts — Backend REST와 1:1 매핑
productsApi.list() | .get() | .create() | .update() | .delete()
productModelsApi.list(productId) | .get() | .create() | .update() | .delete()

// hooks — App에서 UI와 분리
useProducts()      → load, getById, create, update, remove
useProductModels() → load, getById, create, update, remove, clear
```

---

## 4. 데이터 흐름

```
Browser (5173)
  → Vite Proxy (/api)
    → Spring Boot (8080)
      → Controller → Repository → H2/PostgreSQL
        → JSON 응답 → React UI
```

---

## 5. 실행 방법

**Backend**
```powershell
cd backend
.\gradlew.bat bootRun
```

**Frontend**
```powershell
cd frontend
npm.cmd run dev
```

**Cursor Task:** `Tasks: Run Task` → `dev: run all`

---

## 6. 주요 URL

| 용도 | URL |
|------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:8080/api/products |
| H2 Console | http://localhost:8080/h2-console |
| 모델 API | http://localhost:8080/api/products/1/models |

---

## 7. H2 DB 정보

| 항목 | 값 |
|------|-----|
| 파일 위치 | `backend/data/demo-db.mv.db` |
| JDBC URL | `jdbc:h2:file:./data/demo-db` |
| 계정 | `sa` / (비밀번호 없음) |

DB 초기화: `backend/scripts/init-db.cmd reset` 후 backend 재시작

---

## 8. 변경 이력

| 단계 | 내용 |
|------|------|
| 초기 | Maven + H2 + AG Grid 상품 목록 |
| Gradle 전환 | Maven → Gradle Wrapper |
| UI 개선 | Tab + 상품 카드 그리드 (5열) |
| 모델 추가 | `product_models` 테이블, 상품별 모델 5개 |
| REST CRUD | 상품/모델 API + Frontend `productsApi` / `productModelsApi` |
| Modal 상세 | AG Grid 클릭 → `ModelDetailModal` 상세 페이지 표시 |
| React 구조 정리 | hooks/utils 분리, REST 단건 조회 연동, 상태 분리 |
| 재고 필터 토글 | Tab 우측 `상품재고` / `재고10개 이상` 클라이언트 필터 |
