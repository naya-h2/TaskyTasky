import axios from 'axios';
import { PutInvitationRequestType } from '@/lib/types/invitations';

/**
 * 초대 응답
 */
export const editInvitation = async (invitationId: string, data: PutInvitationRequestType) => {
  const response = await axios.put(`/api/cards/${invitationId}`, data);
  console.log(response);
  return response.data;
};
