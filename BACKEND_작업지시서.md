# Backend 작업지시서

Spring Boot 3 + JPA + H2 기반 REST API 서버 개발·운영 가이드입니다.

> 구조 상세: [PROJECT_구조_상세.md](./PROJECT_구조_상세.md) · Frontend 작업: [FRONTEND_작업지시서.md](./FRONTEND_작업지시서.md)

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **역할** | 상품·품목 CRUD REST API 제공 |
| **IDE** | IntelliJ IDEA (권장) |
| **JDK** | 17 |
| **빌드** | Gradle |
| **포트** | 8081 |
| **DB** | H2 파일 DB (`backend/data/demo-db.mv.db`) |

---

## 2. 개발 환경 세팅

### 2.1 사전 설치

- JDK 17
- IntelliJ IDEA (Community / Ultimate)
- Git

### 2.2 프로젝트 열기

```powershell
git clone https://github.com/koobonki/react_test_001.git
cd react_test_001/backend
```

1. IntelliJ → **Open** → `backend` 폴더 선택
2. **Trust Project** → Gradle Sync 완료 대기
3. **File → Project Structure → SDK** → JDK 17 선택

### 2.3 실행

| 방법 | 절차 |
|------|------|
| **Run Configuration** | 상단 **DemoApplication** 선택 → ▶ Run |
| **Gradle** | 터미널: `.\gradlew.bat bootRun` |

### 2.4 동작 확인

- API: http://localhost:8081/api/products
- H2 Console: http://localhost:8081/h2-console
  - JDBC URL: `jdbc:h2:file:./data/demo-db`
  - User: `sa` / Password: (비워두기)

---

## 3. 디렉터리 및 파일 역할

```
backend/
├── build.gradle              # 의존성·빌드 설정
├── settings.gradle           # 프로젝트명 (demo-backend)
├── gradlew.bat               # Gradle Wrapper (Windows)
├── data/
│   └── demo-db.mv.db         # H2 DB 파일 (Git 포함)
├── scripts/
│   └── export-db-snapshot.mjs  # DB → JSON/SQL export
└── src/main/
    ├── java/com/example/demo/
    │   ├── DemoApplication.java              # ★ 시작 클래스
    │   ├── config/
    │   │   ├── WebConfig.java                # CORS 설정
    │   │   └── ProductModelDataInitializer.java
    │   └── product/
    │       ├── Product.java                  # 상품 Entity
    │       ├── ProductModel.java             # 품목 Entity
    │       ├── ProductRepository.java
    │       ├── ProductModelRepository.java
    │       ├── ProductController.java        # /api/products
    │       └── ProductModelController.java   # /api/products/{id}/models
    └── resources/
        ├── application.yml                   # 포트, H2, SQL init
        └── db/
            ├── data.sql                      # (참고) 상품 시드
            ├── data-models.sql               # (참고) 품목 시드
            ├── data-snapshot.sql               # 현재 DB SQL 백업
            └── data-snapshot.json            # 현재 DB JSON 백업
```

---

## 4. 레이어별 작업 가이드

### 4.1 Entity 수정 (DB 컬럼 추가)

**예: 상품에 `description` 필드 추가**

1. `Product.java`에 필드 + getter/setter 추가
2. `ddl-auto: update` 이므로 Backend 재시작 시 H2 테이블 자동 반영
3. `ProductController.update()` 에서 필드 매핑 추가
4. Frontend `api.ts`의 `Product` 타입도 함께 수정 (협업)

```java
// Product.java
private String description;

public String getDescription() { return description; }
public void setDescription(String description) { this.description = description; }
```

### 4.2 REST API 추가

**규칙**

- URL prefix: `/api/`
- Controller 클래스에 `@RestController` + `@RequestMapping`
- Repository 주입은 생성자 주입 사용

**예: 카테goria별 상품 조회**

```java
@GetMapping("/by-category/{category}")
public List<Product> findByCategory(@PathVariable String category) {
    // ProductRepository에 findByCategory 메서드 추가 후 호출
}
```

### 4.3 Repository 쿼리 추가

Spring Data JPA **Query Method** 규칙:

```java
// ProductRepository.java
List<Product> findByCategory(String category);
List<Product> findByStockGreaterThan(Integer stock);
```

복잡한 쿼리는 `@Query` 사용 (`ProductModelRepository` 참고).

### 4.4 CORS 변경

Frontend 포트가 바뀌면 `WebConfig.java`의 `allowedOrigins` 수정:

```java
.allowedOrigins("http://localhost:5173")
```

---

## 5. DB 작업

### 5.1 현재 DB 사용 (기본)

- `application.yml` → `spring.sql.init.mode: never`
- Git에 포함된 `data/demo-db.mv.db`를 그대로 사용
- **별도 DB 설치 불필요**

### 5.2 DB 스냅샷 export

Backend 실행 중:

```powershell
cd backend
node scripts/export-db-snapshot.mjs
```

생성 파일:

- `src/main/resources/db/data-snapshot.json`
- `src/main/resources/db/data-snapshot.sql`

### 5.3 DB 초기화

```powershell
# Backend 중지 후
Remove-Item data\demo-db.mv.db -Force
# Git에서 다시 checkout 하거나, data-snapshot.sql을 H2 Console에서 실행
```

### 5.4 ProductModelDataInitializer

- 앱 시작 시 상품당 품목이 **5개 미만**이면 자동 보충
- 테스트 데이터 정합성 유지용
- 수정: `config/ProductModelDataInitializer.java`

---

## 6. REST API 명세

### 상품 `/api/products`

| Method | URL | Body | 응답 |
|--------|-----|------|------|
| GET | `/api/products` | — | `Product[]` |
| GET | `/api/products/{id}` | — | `Product` |
| POST | `/api/products` | `Product` (id 제외) | 201 + `Product` |
| PUT | `/api/products/{id}` | `Product` | `Product` |
| DELETE | `/api/products/{id}` | — | 204 |

### 품목 `/api/products/{productId}/models`

| Method | URL | Body | 응답 |
|--------|-----|------|------|
| GET | `.../models` | — | `ProductModel[]` |
| GET | `.../models/{id}` | — | `ProductModel` |
| POST | `.../models` | `ProductModel` (id, productId 제외) | 201 |
| PUT | `.../models/{id}` | `ProductModel` | `ProductModel` |
| DELETE | `.../models/{id}` | — | 204 |

**JSON 예시 (ProductModel 응답)**

```json
{
  "id": 1,
  "productId": 1,
  "modelName": "MacBook Pro 14",
  "modelCode": "NB-001",
  "price": 2390000,
  "stock": 8
}
```

---

## 7. 작업 체크리스트

### 신규 기능 개발 시

- [ ] Entity / Repository / Controller 순서로 구현
- [ ] H2 Console 또는 Postman으로 API 테스트
- [ ] Frontend `api.ts` 타입·함수 추가 (필요 시)
- [ ] CORS origin 확인
- [ ] Java 파일 상단 주석·메서드 설명 유지

### 배포·공유 전

- [ ] `.\gradlew.bat build` 성공
- [ ] DB 변경 시 `export-db-snapshot.mjs` 실행 후 스냅샷 commit
- [ ] `demo-db.mv.db` commit (팀 공유 DB인 경우)
- [ ] README / 작업지시서 업데이트

---

## 8. 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| H2 database locked | Backend 중복 실행 | 8081 포트 프로세스 종료 |
| 404 Model not found | productId·modelId 불일치 | URL 경로·DB 데이터 확인 |
| CORS error | WebConfig 미적용 / 포트 불일치 | WebConfig + Frontend 포트 확인 |
| Gradle sync 실패 | JDK 버전 | JDK 17 설정 |
| Module not found (IntelliJ) | Gradle import 미완료 | Gradle Reload |

### 8081 포트 종료 (PowerShell)

```powershell
$p = (Get-NetTCPConnection -LocalPort 8081 -State Listen -ErrorAction SilentlyContinue).OwningProcess
if ($p) { Stop-Process -Id $p -Force }
```

---

## 9. 코딩 컨vention

| 항목 | 규칙 |
|------|------|
| 패키지 | `com.example.demo.product`, `com.example.demo.config` |
| Entity | `@Entity` + `@Table(name = "...")` |
| Controller | `@RestController`, URL은 kebab-case 없이 RESTful |
| 예외 | `ResponseStatusException(HttpStatus.NOT_FOUND, "...")` |
| 주석 | 클래스·public 메서드에 한국어 JavaDoc (초보자용) |

---

## 10. 관련 문서

| 문서 | 내용 |
|------|------|
| [PROJECT_구조_상세.md](./PROJECT_구조_상세.md) | 전체 아키텍처·데이터 흐름 |
| [FRONTEND_작업지시서.md](./FRONTEND_작업지시서.md) | Frontend 연동 작업 |
| [backend/README.md](./backend/README.md) | IntelliJ 빠른 시작 |
