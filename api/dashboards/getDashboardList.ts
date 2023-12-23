import axios from 'axios';

/**
 * 대시보드 목록 조회
 * @param navigationMethod infiniteScroll 또는 pagination 선택
 * @param size 가져올 데이터 개수
 * @param cursorId 무한 스크롤 선택 시 사용
 * @param page 페이지네이션 선택 시 사용
 */
export const getCardList = async (
  navigationMethod: 'infiniteScroll' | 'pagination',
  size: number,
  cursorId?: number,
  page?: number,
) => {
  const query = navigationMethod === 'infiniteScroll' ? `cursorId=${cursorId}` : `page=${page}`;
  const response = await axios.get(`/api/dashboards?navigationMethod=${navigationMethod}&${query}&size=${size}`);
  console.log(response);
  return response.data;
};
