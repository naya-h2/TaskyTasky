import authInstance from '@/lib/axios';

/**
 * 대시보드 상세 조회
 */
export const getDashboardInfo = async (dashboardId: number) => {
  const response = await authInstance.get(`/api/dashboards/${dashboardId}`);
  return response.data;
};
