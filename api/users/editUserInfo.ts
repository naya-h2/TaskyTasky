import instance from '@/lib/axios';
import { PutDashboardRequestType } from '@/lib/types/users';

/**
 * 내 정보 수정
 */
export const editUserInfo = async (data: PutDashboardRequestType) => {
  const response = await instance.put(`/api/users/me`, data);
  return response.data;
};
