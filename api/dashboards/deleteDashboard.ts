import authInstance from '@/lib/axios';

/**
 * 대시보드 삭제
 */
export const deleteDashboard = async (dashboardId: number) => {
  const response = await authInstance.delete(`/api/vercel/dashboards/${dashboardId}`);
};
