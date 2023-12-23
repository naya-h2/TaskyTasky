import axios from 'axios';

/**
 * 대시보드 멤버 삭제
 */
export const deleteMember = async (memberId: string) => {
  const response = await axios.delete(`/api/members/${memberId}`);
};
