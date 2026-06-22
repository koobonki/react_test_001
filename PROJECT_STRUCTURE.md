# 프로젝트 구조 (Backend + Frontend)

Spring Boot 3 + React 풀스택 **상품/품목 관리** 데모입니다.

> **상세 설명은 [PROJECT_구조_상세.md](./PROJECT_구조_상세.md) 참고** (아키텍처·ER·시퀀스·파일별 설명)
---

## 1. 전체 아키텍처

```
┌─────────────────┐     HTTP /api/**      ┌──────────────────┐
│  React (5173)   │ ────────────────────► │ Spring Boot(8081)│
│  Vite + AG Grid │ ◄──── JSON ────────── │  JPA + H2        │
└─────────────────┘                       └──────────────────┘
```

| 레이어 | 역할 |
|--------|------|
| **Frontend** | UI, Tab 필터, 카드, AG Grid, Modal, REST 호출 |
| **Backend** | REST API, 비즈니스 로직, DB CRUD |
| **H2 DB** | 상품·품목 영구 저장 (파일 DB) |

---

## 2. Backend 구조

```
backend/
├── pom.xml                      # Maven 의존성 (Spring Boot, JPA, H2)
├── data/
│   └── demo-db.mv.db            # H2 DB 파일 (실행 시 생성)
└── src/main/
    ├── java/com/example/demo/
    │   ├── DemoApplication.java           # ★ 앱 시작점 (main)
    │   ├── config/
    │   │   ├── WebConfig.java             # CORS (5173 → 8081 허용)
    │   │   └── ProductModelDataInitializer.java  # 품목 5개 미만 보충
    │   └── product/
    │       ├── Product.java               # 상품 Entity (products 테이블)
    │       ├── ProductModel.java          # 품목 Entity (product_models)
    │       ├── ProductRepository.java     # 상품 DB 접근
    │       ├── ProductModelRepository.java
    │       ├── ProductController.java     # /api/products REST
    │       └── ProductModelController.java # /api/products/{id}/models REST
    └── resources/
        ├── application.yml      # 포트 8081, H2, SQL init
        └── db/
            ├── data.sql         # 상품 시드 5건
            └── data-models.sql  # 품목 시드 25건
```

### Backend 레이어 설명 (초보자용)

| 레이어 | 파일 | 하는 일 |
|--------|------|---------|
| **Controller** | `*Controller.java` | HTTP 요청 받기 → Repository 호출 → JSON 응답 |
| **Entity** | `Product.java`, `ProductModel.java` | Java 클래스 ↔ DB 테이블 매핑 (JPA) |
| **Repository** | `*Repository.java` | DB SELECT/INSERT/UPDATE/DELETE |
| **Config** | `WebConfig`, `Initializer` | CORS, 시작 시 데이터 보충 |

### DB 테이블

**products**

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | BIGINT PK | 자동 증가 |
| name | VARCHAR | 상품명 |
| category | VARCHAR | 전자기기 / 가구 |
| price | INT | 가격 |
| stock | INT | 재고 |

**product_models**

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | BIGINT PK | 자동 증가 |
| product_id | BIGINT FK | products.id |
| model_name | VARCHAR | 품목명 |
| model_code | VARCHAR | 품목코드 |
| price | INT | 가격 |
| stock | INT | 재고 |

---

## 3. Frontend 구조

```
frontend/
├── vite.config.ts       # dev 서버 5173, /api → 8081 프록시
├── package.json
└── src/
    ├── main.tsx         # React 진입점
    ├── App.tsx          # ★ 메인 UI + 상태 조합
    ├── api.ts           # REST API 클라이언트
    ├── index.css        # 전역 스타일
    ├── hooks/
    │   ├── useProducts.ts
    │   └── useProductModels.ts
    ├── utils/
    │   ├── productForm.ts
    │   └── modelForm.ts
    └── components/
        ├── ProductCardGrid.tsx
        ├── ProductModelGrid.tsx
        ├── ModelDetailModal.tsx
        └── ToggleSwitch.tsx
```

자세한 Frontend 설명 → [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)

---

## 4. 데이터 흐름 예시

### 화면 시작

1. `App.tsx` → `useProducts.load()` → `GET /api/products`
2. `useProductModels.loadAllForProducts()` → 각 상품별 `GET .../models` → AG Grid 25행
3. Tab **전체** 선택 상태, 상품 카드 5개 표시

### 상품 카드 클릭

1. `selectProduct()` → `GET /api/products/{id}` → 상품 폼 채움
2. `loadModels(productId)` → 해당 상품 품목 5개만 Grid 표시

### AG Grid 행 클릭

1. `openModelDetail()` → `GET .../models/{id}` → Modal 표시

---

## 5. 실행·URL

| 서비스 | URL |
|--------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8081/api/products |
| H2 Console | http://localhost:8081/h2-console |

```powershell
# Backend
cd backend && mvn spring-boot:run

# Frontend
cd frontend && npm run dev
```

---

## 6. 주요 설정 파일

| 파일 | 내용 |
|------|------|
| `backend/.../application.yml` | port 8081, H2 URL, SQL init |
| `frontend/vite.config.ts` | port 5173, API proxy |
| `backend/.../WebConfig.java` | CORS localhost:5173 |

---

## 7. 소스 코드 주석

모든 Java / TypeScript 소스 파일 상단에 **초보자용 한국어 주석**이 포함되어 있습니다.  
파일을 열면 해당 파일의 역할과 주요 함수 설명을 확인할 수 있습니다.
