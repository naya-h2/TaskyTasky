import instance from '@/lib/axios';
import { PostDashboardRequestType } from '@/lib/types/dashboards';

/**
 * 대시보드 생성
 */
export const createDashboard = async (data: PostDashboardRequestType) => {
  const response = await instance.post('/api/dashboards', data);
  return response.data;
};
