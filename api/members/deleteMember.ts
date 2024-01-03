import authInstance from '@/lib/axios';

/**
 * 대시보드 멤버 삭제
 */
export const deleteMember = async (memberId: number) => {
  const response = await authInstance.delete(`/api/members/${memberId}`);
};
