import { useNavigate } from 'react-router-dom';
import { MEGA_MENU_GROUPS } from '../config/menuConfig';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>메인 화면</h1>
      <p className="subtitle">상단 MegaMenu 또는 아래 카드로 각 화면으로 이동할 수 있습니다.</p>

      <div className="home-menu-grid">
        {MEGA_MENU_GROUPS.flatMap((group) =>
          group.items.map((item) => (
            <button
              key={item.path}
              type="button"
              className="home-menu-card"
              onClick={() => navigate(item.path)}
            >
              <span className="home-menu-card-group">{group.label}</span>
              <span className="home-menu-card-label">{item.label}</span>
              <span className="home-menu-card-desc">{item.description}</span>
            </button>
          )),
        )}
      </div>
    </div>
  );
}
