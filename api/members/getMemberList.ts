import authInstance from '@/lib/axios';

/**
 * 내가 받은 초대 목록 조회
 * @param page
 * @param size
 * @param dashboardId
 */
export const getMemberList = async (dashboardId: number, page: number = 1, size: number = 20) => {
  try {
    const response = await authInstance.get(`/api/vercel/members?page=${page}&size=${size}&dashboardId=${dashboardId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
