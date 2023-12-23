import axios from 'axios';
import { PutDashboardRequestType } from '@/lib/types/dashboards';

/**
 * 대시보드 수정
 */
export const editDashboard = async (dashboardId: number, data: PutDashboardRequestType) => {
  const response = await axios.put(`/api/dashboards/${dashboardId}`, data);
  console.log(response);
  return response.data;
};
