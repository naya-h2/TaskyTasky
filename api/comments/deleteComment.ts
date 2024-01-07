import instance from '@/lib/axios';

/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId: number) => {
  const response = await instance.delete(`/api/vercel/comments/${commentId}`);
};
