import { CommentType } from '@/lib/types/comments';
import axios from 'axios';

/**
 * 댓글 생성
 */
export const createComment = async (data: CommentType) => {
  const response = await axios.post('/api/comments', data);
  return response.data;
};
