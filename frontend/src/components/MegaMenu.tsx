/**
 * 상단 MegaMenu — 그룹 패널 + menuCode 연동.
 */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMenuGroups } from '../hooks/useMenuGroups';
import { useMenuNavigation } from '../hooks/useMenuNavigation';
import { getMenuItemKey } from '../utils/menuNavigation';

export function MegaMenu() {
  const { menuGroups, productMenuItems } = useMenuGroups();
  const { goToMenuItem, isMenuItemActive, closeMenuScreen } = useMenuNavigation();
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  const handleItemClick = (groupId: string, item: (typeof menuGroups)[0]['items'][0]) => {
    setOpenGroupId(null);
    goToMenuItem(item, groupId);
  };

  return (
    <nav className="mega-menu" aria-label="메인 메뉴">
      <NavLink to="/" className="mega-menu-home" end onClick={closeMenuScreen}>
        Demo ERP
      </NavLink>

      <ul className="mega-menu-groups">
        {menuGroups.map((group) => (
          <li
            key={group.id}
            className="mega-menu-group"
            onMouseEnter={() => setOpenGroupId(group.id)}
            onMouseLeave={() => setOpenGroupId(null)}
          >
            <button
              type="button"
              className={`mega-menu-trigger${openGroupId === group.id ? ' open' : ''}`}
              aria-expanded={openGroupId === group.id}
              onClick={() => setOpenGroupId((prev) => (prev === group.id ? null : group.id))}
            >
              {group.label}
              {group.id === 'product' && productMenuItems.length > 0 && (
                <span className="mega-menu-count">{productMenuItems.length}</span>
              )}
            </button>

            {openGroupId === group.id && (
              <div className="mega-menu-panel" role="menu">
                <p className="mega-menu-panel-title">{group.label}</p>
                <div className="mega-menu-panel-tabs" role="tablist" aria-label={`${group.label} 탭`}>
                  {group.items.map((item) => {
                    const isActive = isMenuItemActive(item, group.id);
                    return (
                      <button
                        key={getMenuItemKey(item)}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`mega-menu-panel-tab${isActive ? ' active' : ''}`}
                        onClick={() => handleItemClick(group.id, item)}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <ul className="mega-menu-items">
                  {group.items.map((item) => {
                    const isActive = isMenuItemActive(item, group.id);
                    return (
                      <li key={getMenuItemKey(item)}>
                        <button
                          type="button"
                          className={`mega-menu-item${isActive ? ' active' : ''}`}
                          role="menuitem"
                          aria-current={isActive ? 'true' : undefined}
                          onClick={() => handleItemClick(group.id, item)}
                        >
                          <span className="mega-menu-item-label">{item.label}</span>
                          <span className="mega-menu-item-desc">{item.description}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
