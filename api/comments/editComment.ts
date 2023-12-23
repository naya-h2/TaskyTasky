import { PutCommentRequestType } from '@/lib/types/comments';
import axios from 'axios';

/**
 * 댓글 수정
 * @param commentId 수정하려는 댓글의 ID
 * @param data
 */
export const editComment = async (commentId: number, data: PutCommentRequestType) => {
  const response = await axios.put(`/api/cards/${commentId}`, data);
  console.log(response);
  return response.data;
};
