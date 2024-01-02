import authInstance from '@/lib/axios';

/**
 * 내가 받은 초대 목록 조회
 * @param size
 * @param cursorId
 * @param title
 */
export const getInvitationList = async (size: number, cursorId: number | null, title?: string) => {
  let path = `/api/invitations?size=${size}`;
  path += cursorId ? `&cursorId=${cursorId}` : '';
  path += title ? `&title=${title}` : '';

  try {
    const response = await authInstance.get(path);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
