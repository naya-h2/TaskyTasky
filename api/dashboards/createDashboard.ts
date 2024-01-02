import authInstance from '@/lib/axios';
import { PostDashboardRequestType } from '@/lib/types/dashboards';

/**
 * 대시보드 생성
 */
export const createDashboard = async (data: PostDashboardRequestType) => {
  const response = await authInstance.post('/api/dashboards', data);
  return response.data;
};
