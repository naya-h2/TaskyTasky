import axios from 'axios';
import { PostDashboardRequestType } from '@/lib/types/users';
import authInstance from '@/lib/axios';

/**
 * 프로필 이미지 업로드
 */
export const createUserImage = async (data: File) => {
  const response = await authInstance.post(
    '/api/users/me/image',
    { image: data },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.profileImageUrl;
};
