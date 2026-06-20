# Spring Boot 3 + React (AG Grid) 데모

로컬 개발/학습용 풀스택 **상품·품목 관리** 샘플 프로젝트입니다.

> 상세 구조: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) · Frontend: [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md) · 종합 가이드: [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)

---

## 기술 스택

| 구분 | 기술 | 포트 |
|------|------|------|
| **Frontend** | React 18, TypeScript, Vite, AG Grid | **5173** |
| **Backend** | Spring Boot 3.2, Spring Data JPA, Gradle, Java 17 | **8081** |
| **DB** | H2 파일 DB (`backend/data/demo-db.mv.db`) | 내장 |

---

## 실행 방법

### 1. Backend

```powershell
cd backend
.\gradlew.bat bootRun
```

- API: http://localhost:8081/api/products
- H2 Console: http://localhost:8081/h2-console
  - JDBC URL: `jdbc:h2:file:./data/demo-db`
  - Username: `sa` / Password: (비워두기)

### 2. Frontend

```powershell
cd frontend
npm install
npm run dev
```

- UI: http://localhost:5173
- `/api` 요청은 Vite 프록시가 Backend(8081)로 전달합니다.

---

## 화면 기능

1. **카테고리 Tab** — 전체 / 전자기기 / 가구 필터
2. **상품 카드** — 아이콘 카드 클릭 → 상품 선택 + CRUD 폼
3. **상품 CRUD** — POST/PUT/DELETE REST API 연동
4. **품목 CRUD** — 상품 선택 후 품목 등록·수정·삭제
5. **AG Grid** — 화면 시작 시 전체 품목 표시 (최하단)
6. **Modal** — Grid 행 클릭 → 품목 상세
7. **토글 필터** — 상품재고 / 재고 10개 이상

---

## REST API

### 상품 `/api/products`

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/products` | 전체 조회 |
| GET | `/api/products/{id}` | 단건 조회 |
| POST | `/api/products` | 등록 |
| PUT | `/api/products/{id}` | 수정 |
| DELETE | `/api/products/{id}` | 삭제 (연결 품목 포함) |

### 품목 `/api/products/{productId}/models`

| Method | URL | 설명 |
|--------|-----|------|
| GET | `.../models` | 목록 조회 |
| GET | `.../models/{id}` | 단건 조회 |
| POST | `.../models` | 등록 |
| PUT | `.../models/{id}` | 수정 |
| DELETE | `.../models/{id}` | 삭제 |

---

## 초기 데이터

| 데이터 | 개수 | 파일 |
|--------|------|------|
| 상품 | 5건 | `backend/src/main/resources/db/data.sql` |
| 품목 | 25건 (상품당 5개) | `backend/src/main/resources/db/data-models.sql` |

Backend 시작 시 `ProductModelDataInitializer`가 품목이 5개 미만인 상품에 자동 보충합니다.

---

## 로컬 DB (H2)

| 항목 | 값 |
|------|-----|
| DB 파일 | `backend/data/demo-db.mv.db` |
| 장점 | 별도 설치 없음, Spring Boot 기본 지원 |
| 초기화 | DB 파일 삭제 후 Backend 재시작 |

---

## 사전 요구사항

- Java 17+
- Node.js 18+

---

## 프로젝트 구조 (요약)

```
(test)20260619_react/
├── README.md
├── PROJECT_GUIDE.md
├── PROJECT_STRUCTURE.md
├── FRONTEND_STRUCTURE.md
├── backend/          Spring Boot REST API
└── frontend/         React SPA
```
