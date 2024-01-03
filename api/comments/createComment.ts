import { PostCommentRequestType } from '@/lib/types/comments';
import instance from '@/lib/axios';

/**
 * 댓글 생성
 */
export const createComment = async (data: PostCommentRequestType) => {
  const response = await instance.post('/api/comments', data);
  return response.data;
};
