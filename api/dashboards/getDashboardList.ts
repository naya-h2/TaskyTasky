import instance from '@/lib/axios';

/**
 * 대시보드 목록 조회
 * @param navigationMethod infiniteScroll 또는 pagination 선택
 * @param size 가져올 데이터 개수
 * @param cursorId 무한 스크롤 선택 시 사용
 * @param page 페이지네이션 선택 시 사용
 */
export const getDashboardList = async (
  navigationMethod: 'infiniteScroll' | 'pagination',
  size: number,
  cursorId?: number | null,
  page?: number,
) => {
  let query = '';
  if (cursorId) query += `cursorId=${cursorId}`;
  if (page) query += `page=${page}`;
  const response = await instance.get(`/api/dashboards?navigationMethod=${navigationMethod}&size=${size}&${query}`);

  return response.data;
};
