# Frontend (VS Code) 빠른 시작

## 사전 요구사항

- **Node.js 18+**

## 1. 프로젝트 열기

1. VS Code → **File → Open Folder** → `frontend` 폴더 선택
2. (선택) 추천 확장 프로그램 설치 안내 → **Install**

또는 루트의 `react-demo.code-workspace` 로 Frontend 폴더만 열어도 됩니다.

## 2. 의존성 설치

터미널 (`` Ctrl+` ``):

```powershell
npm install
```

또는: **Terminal → Run Task → npm: install**

## 3. 실행

### 방법 A — 터미널 (권장)

```powershell
npm run dev
```

→ http://localhost:5173

### 방법 B — VS Code Task

**Terminal → Run Task → npm: dev**

### 방법 C — Debug

1. **Run and Debug** (Ctrl+Shift+D)
2. **Frontend: Chrome (5173)** 선택 → F5
3. dev 서버 자동 시작 + Chrome 열림

## 4. Backend 연동

Frontend는 `/api` 요청을 Vite 프록시로 **localhost:8081** Backend에 전달합니다.  
**Backend(IntelliJ)를 먼저 실행**한 뒤 Frontend를 켜세요.

| 서비스 | URL |
|--------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8081/api/products |

## 트러블슈팅

| 문제 | 해결 |
|------|------|
| Backend 연결 오류 | IntelliJ에서 DemoApplication 실행 확인 |
| 포트 5173 사용 중 | 다른 Vite 프로세스 종료 |
| npm install 실패 | Node 18+ 확인 |
