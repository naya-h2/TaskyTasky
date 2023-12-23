import axios from 'axios';

/**
 * 카드 목록 조회
 * @param size 받아올 카드 데이터 개수
 * @param cursorId
 * @param columnId 카드를 가져올 칼럼의 아이디
 */
export const getCardList = async (size: number, cursorId: number, columnId: number) => {
  const response = await axios.get(`/api/cards?size=${size}&cursorId=${cursorId}&columnId=${columnId}`);
  console.log(response);
  return response.data;
};
