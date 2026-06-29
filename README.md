# Spring Boot 3 + React (AG Grid) 데모

> **최종 수정일:** 2026-06-29

로컬 개발/테스트용 풀스택 샘플 프로젝트입니다.

## 최종 수정 내용 (2026-06-29)

- **자재 조회** — 자재그룹코드·자재그룹 DB/API 필드 추가, AG Grid 컬럼 반영
- **자재 조회** — 조회 조건: 자재그룹 콤보, 자재명 콤보(그룹 연동), 구분 LIKE 검색, **조회** 버튼
- **자재 조회** — 신규·수정·저장, AG Grid 목록, 그룹 시드/보정 데이터
- **상품관리** — MegaMenu / Sub Tabs, 상품·품목 CRUD, 더블클릭 상세 페이지
- **상품관리** — 초기화 버튼 클릭 시 3초 토스트 메시지

---

## 프로젝트 구조

```
backend/     Spring Boot 3 + JPA + H2 REST API (Gradle, port 8081)
frontend/    React + TypeScript + AG Grid + react-router-dom (Vite, port 5173)
```

## 사전 요구사항

- Java 17+
- Node.js 18+

## 실행 방법

### 1. 백엔드

```bash
cd backend
gradlew.bat bootRun   # Windows
```

- API: http://localhost:8081/api/products
- H2 Console: http://localhost:8081/h2-console
- JDBC URL: `jdbc:h2:file:./data/demo-db` / 계정: `sa` / (비밀번호 없음)

### 2. 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

- UI: http://localhost:5173
- `/api` 요청은 Vite 프록시를 통해 Backend(8081)로 전달됩니다.

## API 엔드포인트

### 상품

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/products` | 전체 조회 |
| GET | `/api/products/{id}` | 단건 조회 |
| POST | `/api/products` | 등록 |
| PUT | `/api/products/{id}` | 수정 |
| DELETE | `/api/products/{id}` | 삭제 |

### 품목 (상품 하위)

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/products/{productId}/models` | 목록 |
| POST | `/api/products/{productId}/models` | 등록 |
| PUT | `/api/products/{productId}/models/{id}` | 수정 |
| DELETE | `/api/products/{productId}/models/{id}` | 삭제 |

### 자재

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/materials` | 전체 조회 |
| GET | `/api/materials/{id}` | 단건 조회 |
| POST | `/api/materials` | 등록 |
| PUT | `/api/materials/{id}` | 수정 |

## 주요 기능

- **MegaMenu** — 상품관리 / 자재관리 / 도움말, Sub Tabs
- **상품/품목 CRUD** — 카테고리 탭, 카드 그리드, AG Grid, 더블클릭 상세
- **자재 조회** — 새 창(`/materials`), 조회 조건 + AG Grid + 상세 CRUD
- **재고 현황** — `/inventory`

## 수정 이력

| 날짜 | 내용 |
|------|------|
| 2026-06-29 | 자재그룹 필드, 조회 조건(구분 LIKE·조회 버튼), 그룹 시드 데이터 |
| 2026-06-29 | MegaMenu, 자재관리, 상품 CRUD 분리, 초기화 토스트 |
