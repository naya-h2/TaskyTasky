import { PutInvitationRequestType } from '@/lib/types/invitations';
import authInstance from '@/lib/axios';

/**
 * 초대 응답
 */
export const editInvitation = async (invitationId: string, data: PutInvitationRequestType) => {
  const response = await authInstance.put(`/api/vercel/invitations/${invitationId}`, data);
  return response.data;
};
