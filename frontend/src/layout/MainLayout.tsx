import { Outlet } from 'react-router-dom';
import { MegaMenu } from '../components/MegaMenu';
import { MegaMenuSubTabs } from '../components/MegaMenuSubTabs';

export default function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <MegaMenu />
        <MegaMenuSubTabs />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
