import authInstance from '@/lib/axios';

/**
 * 내 정보 조회
 */
export const getUserInfo = async () => {
  const response = await authInstance.get(`/api/users/me`);
  return response.data;
};
