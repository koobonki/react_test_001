import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuItem } from '../config/menuConfig';
import { useProductMenu } from '../context/ProductMenuContext';

export function useMenuNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeMenuCode,
    setActiveMenuCode,
    activeGroupId,
    setActiveGroupId,
  } = useProductMenu();

  const goToMenuItem = useCallback(
    (item: MenuItem, groupId: string) => {
      if (item.openInNewWindow) {
        window.open(
          `${window.location.origin}${item.path}`,
          '_blank',
          'noopener,noreferrer,width=1280,height=800',
        );
        return;
      }

      setActiveGroupId(groupId);
      if (item.menuCode) {
        setActiveMenuCode(item.menuCode);
        navigate('/products');
        return;
      }
      setActiveMenuCode(null);
      navigate(item.path);
    },
    [navigate, setActiveGroupId, setActiveMenuCode],
  );

  const closeMenuScreen = useCallback(() => {
    setActiveGroupId(null);
    setActiveMenuCode(null);
  }, [setActiveGroupId, setActiveMenuCode]);

  const isMenuItemActive = useCallback(
    (item: MenuItem, groupId: string) => {
      if (activeGroupId !== groupId) return false;
      if (item.menuCode) {
        return item.menuCode === activeMenuCode && location.pathname === '/products';
      }
      if (item.path === '/products') {
        return location.pathname === '/products' && !activeMenuCode;
      }
      return location.pathname === item.path;
    },
    [activeGroupId, activeMenuCode, location.pathname],
  );

  return { goToMenuItem, closeMenuScreen, isMenuItemActive, activeGroupId };
}
