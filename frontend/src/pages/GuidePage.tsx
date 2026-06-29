export default function GuidePage() {
  return (
    <div>
      <h1>프로젝트 가이드</h1>
      <p className="subtitle">Frontend + Backend 실행 및 MegaMenu 구조</p>

      <section className="section-panel guide-section">
        <h2 className="section-title">실행 방법</h2>
        <ul className="guide-list">
          <li>Backend: IntelliJ에서 DemoApplication 실행 (port 8081)</li>
          <li>Frontend: VS Code에서 npm run dev (port 5173)</li>
          <li>API 프록시: vite.config.ts → /api → localhost:8081</li>
        </ul>
      </section>

      <section className="section-panel guide-section">
        <h2 className="section-title">MegaMenu → 페이지 파일</h2>
        <ul className="guide-list">
          <li>메인 화면 → src/pages/HomePage.tsx</li>
          <li>상품/품목 CRUD → src/pages/ProductManagementPage.tsx</li>
          <li>재고 현황 → src/pages/InventoryPage.tsx</li>
          <li>품목 상세 → src/pages/ProductModelDetailPage.tsx (AG Grid 더블클릭)</li>
        </ul>
      </section>
    </div>
  );
}
