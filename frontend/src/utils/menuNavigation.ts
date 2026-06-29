/** pathname → MegaMenu 그룹 id 매핑 */
export function getMenuGroupIdByPath(pathname: string): string | null {
  if (pathname === '/') return 'home';
  if (pathname === '/products' || pathname.startsWith('/products/') || pathname === '/inventory') {
    return 'product';
  }
  if (pathname === '/guide') return 'guide';
  if (pathname === '/materials') return 'material';
  return null;
}

/** MegaMenu 탭·항목의 고유 키 */
export function getMenuItemKey(item: { path: string; menuCode?: string }): string {
  return item.menuCode ?? item.path;
}
