import authInstance from '@/lib/axios';
import { PostDashboardInvitationRequestType } from '@/lib/types/dashboards';
import { toast } from 'react-toastify';

/**
 * 대시보드 초대하기
 */
export const inviteDashboard = async (dashboardId: number, data: PostDashboardInvitationRequestType) => {
  try {
    const response = await authInstance.post(`/api/dashboards/${dashboardId}/invitations`, data);
    //alert('초대에 성공했어요!');
    return response;
  } catch (error: any) {
    return error.response;
  }
};
