import { PostDashboardInvitationRequestType } from '@/lib/types/dashboards';
import axios from 'axios';

/**
 * 대시보드 초대하기
 */
export const inviteDashboard = async (dashboardId: number, data: PostDashboardInvitationRequestType) => {
  const response = await axios.post(`/api/dashboards/${dashboardId}/invitations`, data);
  return response.data;
};
