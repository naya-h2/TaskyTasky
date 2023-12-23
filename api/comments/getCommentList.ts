import axios from 'axios';

/**
 * 댓글 목록 조회
 * @param size 받아올 댓글 데이터 개수
 * @param cursorId
 * @param columnId 댓글을 가져올 카드의 ID
 */
export const getCardList = async (size: number, cursorId: number, cardId: number) => {
  const response = await axios.get(`/api/comments?size=${size}&cursorId=${cursorId}&cardId=${cardId}`);
  console.log(response);
  return response.data;
};
