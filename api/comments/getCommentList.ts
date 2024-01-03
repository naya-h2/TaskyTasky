import instance from '@/lib/axios';

/**
 * 댓글 목록 조회
 * @param size 받아올 댓글 데이터 개수
 * @param cursorId
 * @param columnId 댓글을 가져올 카드의 ID
 */
export const getCommentList = async (size: number = 10, cardId: number, cursorId?: number) => {
  const cursorID = cursorId ? `&cursorId=${cursorId}` : ``;
  const response = await instance.get(`/api/comments?size=${size}${cursorID}&cardId=${cardId}`);
  return response.data;
};
