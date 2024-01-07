import authInstance from '@/lib/axios';
import { PutDashboardRequestType } from '@/lib/types/users';

/**
 * 내 정보 수정
 */
export const editUserInfo = async (data: PutDashboardRequestType) => {
  try {
    const response = await authInstance.put(`/api/vercel/users/me`, data);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
