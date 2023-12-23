import axios from 'axios';

/**
 * 내가 받은 초대 목록 조회
 * @param page
 * @param size
 * @param dashboardId
 */
export const getMemberList = async (page: number, size: number, dashboardId: number) => {
  const response = await axios.get(`/api/members?page=${page}&size=${size}&dashboardId=${dashboardId}`);
  console.log(response);
  return response.data;
};
