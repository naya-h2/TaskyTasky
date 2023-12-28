import { PutInvitationRequestType } from '@/lib/types/invitations';
import instance from '@/lib/axios';

/**
 * 초대 응답
 */
export const editInvitation = async (invitationId: string, data: PutInvitationRequestType) => {
  const response = await instance.put(`/api/invitations/${invitationId}`, data);
  console.log(response);
  return response.data;
};
