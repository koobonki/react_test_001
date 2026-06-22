# Spring Boot 3 + React (AG Grid) 데모

로컬 개발/학습용 풀스택 **상품·품목 관리** 샘플 프로젝트입니다.

> **문서**
> - [PROJECT_구조_상세.md](./PROJECT_구조_상세.md) — 아키텍처·디렉터리·API 상세
> - [BACKEND_작업지시서.md](./BACKEND_작업지시서.md) — Backend(IntelliJ) 작업 가이드
> - [FRONTEND_작업지시서.md](./FRONTEND_작업지시서.md) — Frontend(VS Code) 작업 가이드
> - [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) · [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) · [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)

---

## Git clone 후 바로 실행 (IntelliJ + VS Code)

### 1. Clone

```powershell
git clone https://github.com/koobonki/react_test_001.git
cd react_test_001
```

### 2. Backend — IntelliJ IDEA

1. IntelliJ → **Open** → `backend` 폴더
2. JDK **17** 설정 (File → Project Structure → SDK)
3. Maven import 완료 후 **DemoApplication** Run ▶
4. API 확인: http://localhost:8081/api/products

→ 자세히: [backend/README.md](./backend/README.md)

**DB:** `backend/data/demo-db.mv.db` 가 Git에 포함되어 있어 pull 후 **별도 DB 설정 없이** 바로 연결됩니다.

### 3. Frontend — Visual Studio Code

1. VS Code → **Open Folder** → `frontend` 폴더
2. 터미inal: `npm install` → `npm run dev`
3. UI: http://localhost:5173

→ 자세히: [frontend/README.md](./frontend/README.md)

| IDE | 폴더 | 실행 |
|-----|------|------|
| **IntelliJ** | `backend/` | Run **DemoApplication** |
| **VS Code** | `frontend/` | `npm run dev` |

---

## 기술 스택

| 구분 | 기술 | 포트 |
|------|------|------|
| **Frontend** | React 18, TypeScript, Vite, AG Grid | **5173** |
| **Backend** | Spring Boot 3.2, Spring Data JPA, Maven, Java 17 | **8081** |
| **DB** | H2 파일 DB (`backend/data/demo-db.mv.db`, Git 포함) | 내장 |

---

## CLI 실행 (IDE 없이)

```powershell
# Backend
cd backend
mvn spring-boot:run

# Frontend (새 터미널)
cd frontend
npm install
npm run dev
```

---

## 화면 기능

1. **카테고리 Tab** — 전체 / 전자기기 / 가구 필터
2. **상품 카드** — 아이콘 카드 클릭 → 상품 선택 + CRUD 폼
3. **상품/품목 CRUD** — REST API 연동
4. **AG Grid** — 화면 시작 시 전체 품목 표시 (최하단)
5. **Modal** — Grid 행 클릭 → 품목 상세

---

## REST API

### 상품 `/api/products`

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/products` | 전체 조회 |
| GET | `/api/products/{id}` | 단건 조회 |
| POST | `/api/products` | 등록 |
| PUT | `/api/products/{id}` | 수정 |
| DELETE | `/api/products/{id}` | 삭제 |

### 품목 `/api/products/{productId}/models`

| Method | URL | 설명 |
|--------|-----|------|
| GET | `.../models` | 목록 조회 |
| GET | `.../models/{id}` | 단건 조회 |
| POST | `.../models` | 등록 |
| PUT | `.../models/{id}` | 수정 |
| DELETE | `.../models/{id}` | 삭제 |

---

## DB 데이터

| 파일 | 설명 |
|------|------|
| `backend/data/demo-db.mv.db` | **실제 H2 DB** (Git 포함, pull 후 즉시 사용) |
| `backend/src/main/resources/db/data-snapshot.sql` | SQL 백업/복원용 |
| `backend/src/main/resources/db/data-snapshot.json` | JSON 스냅샷 |
| `backend/scripts/export-db-snapshot.mjs` | 실행 중 DB → 스냅샷 export |

---

## 사전 요구사항

- Java 17+ (Backend / IntelliJ)
- Maven 3.9+ (Backend CLI)
- Node.js 18+ (Frontend / VS Code)
- IntelliJ IDEA, Visual Studio Code

---

## 프로젝트 구조

```
react_test_001/
├── backend/          Spring Boot + H2 DB (IntelliJ)
├── frontend/         React + Vite (VS Code)
├── react-demo.code-workspace
└── README.md
```
