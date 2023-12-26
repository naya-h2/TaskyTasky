import axios from 'axios';

/**
 * 대시보드 상세 조회
 */
export const getDashboardInfo = async (dashboardId: number) => {
  const response = await axios.get(`/api/dashboards/${dashboardId}`);
  console.log(response);
  return response.data;
};
