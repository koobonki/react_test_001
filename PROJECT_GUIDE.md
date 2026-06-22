# 프로젝트 종합 가이드

Spring Boot 3 + React 풀스택 **상품/품목 관리** 데모의 학습용 종합 문서입니다.

> 빠른 실행: [README.md](./README.md) · Backend/Frontend 구조: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) · Frontend 상세: [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)

---

## 1. 이 프로젝트로 배울 수 있는 것

- REST API CRUD (GET/POST/PUT/DELETE)
- Spring Boot + JPA + H2
- React Hooks + Custom Hook 패턴
- 컴포넌트 분리 (Container/Presentational)
- AG Grid 연동
- Vite dev server + API Proxy
- CORS 설정

---

## 2. 용어 정리

| 용어 | 이 프로젝트에서의 의미 |
|------|----------------------|
| **상품** | Product — 노트북, 책상 등 카드로 표시 |
| **품목** | ProductModel — 상품 아래 SKU (MacBook Pro 14 등) |
| **Entity** | DB 테이블과 1:1 매핑되는 Java 클래스 |
| **Repository** | DB 접근 인터페이스 (JPA) |
| **Controller** | HTTP URL ↔ Java 메서드 연결 |
| **Hook** | React에서 상태·API 로직 재사용 단위 |

---

## 3. 실행 체크리스트

- [ ] Java 17 설치 확인 (`java -version`)
- [ ] Maven 설치 확인 (`mvn -v`)
- [ ] Node.js 18+ 설치 확인 (`node -v`)
- [ ] Backend: `cd backend && mvn spring-boot:run`
- [ ] http://localhost:8081/api/products → JSON 배열 확인
- [ ] Frontend: `cd frontend && npm run dev`
- [ ] http://localhost:5173 → Tab + 카드 + AG Grid 확인

---

## 4. 화면 사용 흐름

### 시작 화면

- **전체** Tab 활성 (파란색)
- 상품 카드 5개 (전자기기 3 + 가구 2)
- AG Grid 최하단에 품목 25개 (상품명 컬럼 포함)

### Tab 클릭

- **전자기기** → 전자 상품 카드 + 해당 품목만 Grid
- **가구** → 가구 카드 + 해당 품목만 Grid

### 상품 카드 클릭

- 상품 CRUD 폼에 데이터 로드
- 품목 CRUD 폼 표시
- AG Grid → 해당 상품 품목 5개만 (상품명 컬럼 숨김)

### AG Grid 행 클릭

- Modal: 품목명, 코드, 가격, 재고
- **수정하기** → 품목 폼으로 이동

### 토글 필터

- **상품재고**: 재고 0인 상품 카드 숨김
- **재고10개 이상**: Grid에서 재고 10 미만 품목 숨김

---

## 5. API ↔ Frontend 매핑

| UI 동작 | Frontend | Backend |
|---------|----------|---------|
| 앱 시작 | `productsApi.list()` | `ProductController.findAll()` |
| 카드 클릭 | `productsApi.get(id)` | `ProductController.findById()` |
| POST 등록 | `productsApi.create()` | `ProductController.create()` |
| Grid 품목 | `productModelsApi.list()` | `ProductModelController.findAll()` |
| Modal 상세 | `productModelsApi.get()` | `ProductModelController.findById()` |

---

## 6. Backend 핵심 파일 읽는 순서 (초보자 추천)

1. `DemoApplication.java` — 시작점
2. `Product.java` / `ProductModel.java` — 데이터 구조
3. `ProductController.java` — 상품 API
4. `ProductModelController.java` — 품목 API
5. `application.yml` — DB·포트 설정
6. `data.sql` / `data-models.sql` — 초기 데이터

---

## 7. Frontend 핵심 파일 읽는 순서

1. `main.tsx` — 진입점
2. `api.ts` — API 타입·호출
3. `hooks/useProducts.ts` — 상품 Hook
4. `App.tsx` — 전체 UI·로직
5. `ProductCardGrid.tsx` — 카드 UI
6. `ProductModelGrid.tsx` — AG Grid

---

## 8. 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| `Backend에 연결할 수 없습니다` | Backend 미실행 | `mvn spring-boot:run` |
| Grid 비어 있음 | 품목 시드 없음 | Backend 재시작 |
| H2 lock 오류 | Backend 중복 실행 | 8081 포트 프로세스 종료 |
| Tab 클릭해도 변화 없음 | category 필드 비어 있음 | H2에서 products 확인 |
| CORS 오류 | WebConfig 미적용 | Backend 재시작 |

### 8081 포트 프로세스 종료 (PowerShell)

```powershell
$p = (Get-NetTCPConnection -LocalPort 8081 -State Listen -ErrorAction SilentlyContinue).OwningProcess
if ($p) { Stop-Process -Id $p -Force }
```

---

## 9. DB 초기화

```powershell
# Backend 중지 후
Remove-Item backend\data\demo-db.mv.db -ErrorAction SilentlyContinue
cd backend
mvn spring-boot:run
```

---

## 10. 소스 코드 주석

**모든 Backend(Java) / Frontend(TS·TSX) 소스**에 초보자용 한국어 주석이 달려 있습니다.

- 클래스/파일 상단: 이 파일이 하는 일
- 주요 메서드: HTTP 메서드, 호출 시점
- App.tsx: JSX 섹션별 `{/* 1. Tab + 카드 */}` 주석

CSS(`index.css`)는 섹션별 구분 주석만 포함합니다.

---

## 11. 확장 아이디어 (학습용)

- [ ] 카테고리 Tab을 DB에서 동적으로 로드
- [ ] JWT 로그인 추가
- [ ] PostgreSQL 프로필 전환
- [ ] 품목 전체 조회 API (`GET /api/models`) 추가
- [ ] React Router로 페이지 분리
