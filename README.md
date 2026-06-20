# Spring Boot 3 + React (AG Grid) 데모

로컬 개발/테스트용 풀스택 샘플 프로젝트입니다.

## 로컬 DB

기본은 **H2 파일 DB** (`backend/data/demo-db`)이며, backend 실행 시 자동 생성됩니다.

| 항목 | 내용 |
|------|------|
| DB 파일 | `backend/data/demo-db.mv.db` |
| H2 Console | http://localhost:8080/h2-console |
| JDBC URL | `jdbc:h2:file:./data/demo-db` |
| 계정 | `sa` / (비밀번호 없음) |
| 초기 데이터 | `src/main/resources/db/data.sql` (5건) |

DB 초기화/정보 확인:

```powershell
cd backend
.\scripts\init-db.cmd        # DB 경로 및 접속 정보 출력
.\scripts\init-db.cmd reset  # DB 파일 삭제 후 backend 재시작 시 재생성
```

### PostgreSQL (Docker, 선택)

Docker 설치 후:

```powershell
cd backend
.\scripts\start-postgres-db.cmd
.\gradlew.bat bootRun --args="--spring.profiles.active=postgres"
```

- JDBC URL: `jdbc:postgresql://localhost:5432/demo`
- 계정: `postgres` / `postgres`

---

## 로컬 DB 제안 (참고)

### 1. H2 (권장 - 이 프로젝트에 적용됨)

| 항목 | 내용 |
|------|------|
| 장점 | 별도 설치 없음, Spring Boot 기본 지원, 파일/메모리 모드 선택 가능 |
| 용도 | 빠른 프로토타이핑, 단위/통합 테스트, 로컬 CRUD 개발 |
| 콘솔 | http://localhost:8080/h2-console |
| JDBC URL | `jdbc:h2:file:./data/demo-db` |
| 계정 | `sa` / (비밀번호 없음) |

### 2. PostgreSQL (Docker) - 운영 DB와 유사한 환경

```bash
docker run --name local-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=demo -p 5432:5432 -d postgres:16
```

- 운영 환경과 동일한 SQL/타입을 쓰고 싶을 때 적합
- `application.yml`의 datasource를 PostgreSQL로 변경하면 됨

### 3. SQLite - 초경량 파일 DB

- 단일 파일로 관리, 임베드 앱/소규모 툴에 적합
- Spring Boot에서도 사용 가능하나 JPA 호환성은 H2/PostgreSQL보다 제한적

**결론:** 로컬 개발·테스트에는 **H2**가 가장 편하고, 운영 DB와 맞추려면 **PostgreSQL Docker**를 추가로 사용하세요.

---

## 프로젝트 구조

```
backend/     Spring Boot 3 + JPA + H2 REST API
frontend/    React + TypeScript + AG Grid
```

## 사전 요구사항

- Java 17+
- Node.js 18+

## 실행 방법

### 1. 백엔드

```bash
cd backend
./gradlew bootRun
```

Windows:

```powershell
cd backend
.\gradlew.bat bootRun
```

- API: http://localhost:8080/api/products
- H2 Console: http://localhost:8080/h2-console

### 2. 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

- UI: http://localhost:5173

## API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/products` | 전체 조회 |
| GET | `/api/products/{id}` | 단건 조회 |
| POST | `/api/products` | 등록 |
| PUT | `/api/products/{id}` | 수정 |
| DELETE | `/api/products/{id}` | 삭제 |

## 기능

- AG Grid로 상품 목록 표시 (정렬, 필터 기본 지원)
- 행 클릭 시 폼에 데이터 로드 → 수정/삭제
- 폼으로 신규 상품 등록
- 시작 시 샘플 데이터 5건 자동 삽입
