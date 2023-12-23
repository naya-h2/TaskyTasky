import axios from 'axios';

/**
 * 대시보드 삭제
 */
export const deleteDashboard = async (dashboardId: number) => {
  const response = await axios.delete(`/api/dashboards/${dashboardId}`);
};
