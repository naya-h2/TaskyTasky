import instance from '@/lib/axios';

/**
 * 카드 목록 조회
 * @param size 받아올 카드 데이터 개수
 * @param cursorId
 * @param columnId 카드를 가져올 칼럼의 아이디
 */
export const getCardList = async (columnId: number, size?: number, cursorId?: number) => {
  const query = size
    ? cursorId
      ? '&size=${size}&cursorId=${cursorId}'
      : '&size=${size}'
    : cursorId
      ? '&cursorId=${cursorId}'
      : '';

  const response = await instance.get(`/api/cards?columnId=${columnId}${query}`);
  return response.data;
};
