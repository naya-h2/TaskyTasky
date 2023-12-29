import instance from '@/lib/axios';

/**
 * 대시보드 상세 조회
 */
export const getDashboardInfo = async (dashboardId: number) => {
  const response = await instance.get(`/api/dashboards/${dashboardId}`);
  return response.data;
};
