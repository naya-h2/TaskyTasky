import authInstance from '@/lib/axios';

/**
 * 카드 이미지 업로드
 */
export const uploadCardImg = async (columnId: number, data: File) => {
  try {
    const response = await authInstance.post(
      `/api/vercel/columns/${columnId}/card-image`,
      { image: data },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};
