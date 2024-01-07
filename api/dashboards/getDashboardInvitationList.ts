import authInstance from '@/lib/axios';

/**
 * 대시보드 초대 불러오기
 */
export const getDashboardInvitationList = async (dashboardId: number, size: number, page: number) => {
  try {
    const response = await authInstance.get(
      `/api/vercel/dashboards/${dashboardId}/invitations?page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
