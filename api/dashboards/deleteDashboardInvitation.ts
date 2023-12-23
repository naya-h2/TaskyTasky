import axios from 'axios';

/**
 * 대시보드 초대 취소
 */
export const deleteDashboardInvitation = async (dashboardId: number, invitationId: number) => {
  const response = await axios.delete(`/api/dashboards/${dashboardId}/invitations/${invitationId}`);
};
