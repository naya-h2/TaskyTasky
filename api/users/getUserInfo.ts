import instance from '@/lib/axios';

/**
 * 내 정보 조회
 */
export const getUserInfo = async () => {
  const response = await instance.get(`/api/users/me`);
  return response.data;
};
