# Backend (IntelliJ) 빠른 시작

## 사전 요구사항

- **JDK 17** (File → Project Structure → SDK)
- IntelliJ IDEA (Community 또는 Ultimate)

## 1. 프로젝트 열기

1. IntelliJ → **Open** → `backend` 폴더 선택
2. **Trust Project** → Gradle import 완료까지 대기
3. JDK 17이 없으면: File → Project Structure → SDK → 17 추가

## 2. DB (H2)

pull 후 `data/demo-db.mv.db` 파일이 포함되어 있습니다.  
Backend 실행 시 **별도 DB 설치 없이** 이 파일에 자동 연결됩니다.

| 항목 | 값 |
|------|-----|
| 파일 | `backend/data/demo-db.mv.db` |
| JDBC URL | `jdbc:h2:file:./data/demo-db` |
| H2 Console | http://localhost:8081/h2-console |

## 3. 실행

### 방법 A — Run Configuration (권장)

1. 상단 Run Configuration에서 **DemoApplication** 선택
2. ▶ Run 클릭
3. http://localhost:8081/api/products 확인

### 방법 B — Gradle

```powershell
cd backend
.\gradlew.bat bootRun
```

## 4. DB 복원 / 재export

- 스냅샷 SQL: `src/main/resources/db/data-snapshot.sql`
- 스냅샷 JSON: `src/main/resources/db/data-snapshot.json`
- Backend 실행 중 export:

```powershell
node scripts/export-db-snapshot.mjs
```

## 트러블슈팅

| 문제 | 해결 |
|------|------|
| H2 file locked | 8081 포트 Backend 중복 실행 종료 |
| Module not found | Gradle Reload (우클릭 build.gradle → Reload) |
| JDK 오류 | Project SDK를 17로 설정 |
