/** 자재그룹 조회 조건·콤보박스 옵션 */
export const MATERIAL_GROUPS = [
  { groupCode: 'GRP-01', groupName: '원자재그룹' },
  { groupCode: 'GRP-02', groupName: '부자재그룹' },
  { groupCode: 'GRP-03', groupName: '포장재그룹' },
  { groupCode: 'GRP-04', groupName: '소모품그룹' },
  { groupCode: 'GRP-05', groupName: '시험자재그룹' },
  { groupCode: 'GRP-06', groupName: '전자부품그룹' },
] as const;

export type MaterialGroup = (typeof MATERIAL_GROUPS)[number];

export function findGroupByCode(groupCode: string): MaterialGroup | undefined {
  return MATERIAL_GROUPS.find((group) => group.groupCode === groupCode);
}

export function findGroupByName(groupName: string): MaterialGroup | undefined {
  return MATERIAL_GROUPS.find((group) => group.groupName === groupName);
}
