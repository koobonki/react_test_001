/**
 * MegaMenu 구성 — 메뉴 그룹·항목·라우트(path)와 페이지 파일을 연결합니다.
 */
export type MenuItem = {
  label: string;
  path: string;
  description: string;
  menuCode?: string;
  openInNewWindow?: boolean;
};

export type MenuGroup = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const MEGA_MENU_GROUPS: MenuGroup[] = [
  {
    id: 'home',
    label: 'HOME',
    items: [
      {
        label: '메인 화면',
        path: '/',
        description: '대시보드 및 빠른 이동',
      },
    ],
  },
  {
    id: 'product',
    label: '상품관리',
    items: [
      {
        label: '상품/품목 CRUD',
        path: '/products',
        description: 'REST API 상품·품목 관리',
      },
      {
        label: '재고 현황',
        path: '/inventory',
        description: '카테고리별 재고 요약',
      },
    ],
  },
  {
    id: 'material',
    label: '자재관리',
    items: [
      {
        label: '자재 조회',
        path: '/materials',
        description: '새 창에서 자재 목록·상세 조회',
        openInNewWindow: true,
      },
    ],
  },
  {
    id: 'guide',
    label: '도움말',
    items: [
      {
        label: '프로젝트 가이드',
        path: '/guide',
        description: '실행 방법 및 구조 안내',
      },
    ],
  },
];
