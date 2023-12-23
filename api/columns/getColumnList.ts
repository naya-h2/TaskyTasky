import axios from 'axios';

/**
 * 칼럼 목록 조회
 */
export const getColumnList = async (dashboardId: number) => {
  const response = await axios.post(`/api/columns?dashboardId=${dashboardId}`);
  console.log(response);
  return response.data;
};
