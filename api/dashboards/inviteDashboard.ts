import authInstance from '@/lib/axios';
import { PostDashboardInvitationRequestType } from '@/lib/types/dashboards';

/**
 * 대시보드 초대하기
 */
export const inviteDashboard = async (dashboardId: number, data: PostDashboardInvitationRequestType) => {
  try {
    const response = await authInstance.post(`/api/dashboards/${dashboardId}/invitations`, data);
    alert('초대 성공 ><!');
    return response.data;
  } catch (error: any) {
    const errorMsg = error.response.data.message;
    console.log(errorMsg);
    return errorMsg;
  }
};
