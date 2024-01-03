import { PutCommentRequestType } from '@/lib/types/comments';
import instance from '@/lib/axios';

/**
 * 댓글 수정
 * @param commentId 수정하려는 댓글의 ID
 * @param data
 */
export const editComment = async (commentId: number, data: PutCommentRequestType) => {
  const response = await instance.put(`/api/comments/${commentId}`, data);
  return response.data;
};
