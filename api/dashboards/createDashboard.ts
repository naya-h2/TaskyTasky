import { PostDashboardRequestType } from '@/lib/types/dashboards';
import axios from 'axios';

/**
 * 대시보드 생성
 */
export const createComment = async (data: PostDashboardRequestType) => {
  const response = await axios.post('/api/dashboards', data);
  return response.data;
};
