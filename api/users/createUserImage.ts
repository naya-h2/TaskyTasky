import axios from 'axios';
import { PostDashboardRequestType } from '@/lib/types/users';

/**
 * 프로필 이미지 업로드
 */
export const createUserImage = async (data: PostDashboardRequestType) => {
  const response = await axios.post('/api/users/me/image', data);
  return response.data;
};
