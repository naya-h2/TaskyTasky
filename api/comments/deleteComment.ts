import axios from 'axios';

/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId: number) => {
  const response = await axios.delete(`/api/cards/${commentId}`);
};
