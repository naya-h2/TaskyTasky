import authInstance from '@/lib/axios';

/**
 * 대시보드 초대 취소
 */
export const deleteDashboardInvitation = async (dashboardId: number, invitationId: number | undefined) => {
  const response = await authInstance.delete(`/api/vercel/dashboards/${dashboardId}/invitations/${invitationId}`);
};
