/**
 * MegaMenu 클릭으로 연 화면의 그룹 Tab — MegaMenu 바로 아래 표시.
 */
import { useMenuGroups } from '../hooks/useMenuGroups';
import { useMenuNavigation } from '../hooks/useMenuNavigation';
import { getMenuItemKey } from '../utils/menuNavigation';

export function MegaMenuSubTabs() {
  const { menuGroups } = useMenuGroups();
  const { goToMenuItem, isMenuItemActive, activeGroupId } = useMenuNavigation();

  if (!activeGroupId) return null;

  const activeGroup = menuGroups.find((group) => group.id === activeGroupId);
  if (!activeGroup || activeGroup.items.length === 0) return null;

  return (
    <nav className="mega-menu-sub-tabs" aria-label={`${activeGroup.label} 하위 메뉴`}>
      <p className="mega-menu-sub-tabs-label">{activeGroup.label}</p>
      <div className="mega-menu-sub-tabs-list" role="tablist">
        {activeGroup.items.map((item) => {
          const isActive = isMenuItemActive(item, activeGroup.id);
          return (
            <button
              key={getMenuItemKey(item)}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`mega-menu-sub-tab${isActive ? ' active' : ''}`}
              onClick={() => goToMenuItem(item, activeGroup.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
