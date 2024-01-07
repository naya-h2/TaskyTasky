import authInstance from '@/lib/axios';
import { PutDashboardRequestType } from '@/lib/types/dashboards';

/**
 * 대시보드 수정
 */
export const editDashboard = async (dashboardId: number, data: PutDashboardRequestType) => {
  const response = await authInstance.put(`/api/vercel/dashboards/${dashboardId}`, data);
  return response.data;
};
