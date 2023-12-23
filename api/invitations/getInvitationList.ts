import axios from 'axios';

/**
 * 내가 받은 초대 목록 조회
 * @param size
 * @param cursorId
 * @param title
 */
export const getInvitationList = async (size: number, cursorId: number, title: string) => {
  const response = await axios.get(`/api/invitations?size=${size}&cursorId=${cursorId}&title=${title}`);
  console.log(response);
  return response.data;
};
