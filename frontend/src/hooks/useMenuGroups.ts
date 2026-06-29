import { useMemo } from 'react';
import { MEGA_MENU_GROUPS, type MenuGroup, type MenuItem } from '../config/menuConfig';
import { useProductMenu } from '../context/ProductMenuContext';
import { getProductMenuCode } from '../utils/productForm';

export function useMenuGroups() {
  const { products } = useProductMenu();

  const productMenuItems = useMemo<MenuItem[]>(
    () =>
      products.map((product) => ({
        label: product.name,
        path: '/products',
        description: `메뉴코드: ${getProductMenuCode(product)}`,
        menuCode: getProductMenuCode(product),
      })),
    [products],
  );

  const menuGroups = useMemo<MenuGroup[]>(
    () =>
      MEGA_MENU_GROUPS.map((group) => {
        if (group.id !== 'product') return group;

        const crudItem = group.items.find((item) => item.path === '/products' && !item.menuCode);
        const otherItems = group.items.filter((item) => item !== crudItem);

        return {
          ...group,
          items: [
            ...(crudItem ? [crudItem] : []),
            ...productMenuItems,
            ...otherItems,
          ],
        };
      }),
    [productMenuItems],
  );

  return { menuGroups, productMenuItems };
}
