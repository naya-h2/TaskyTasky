import axios from 'axios';
import { PutDashboardRequestType } from '@/lib/types/users';

/**
 * 내 정보 수정
 */
export const editUserInfo = async (data: PutDashboardRequestType) => {
  const response = await axios.put(`/api/users/me`, data);
  console.log(response);
  return response.data;
};
