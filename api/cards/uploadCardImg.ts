import instance from '@/lib/axios';

/**
 * 카드 이미지 업로드
 */
export const uploadCardImg = async (columnId: number, data: File) => {
  const response = await instance.post(
    `/api/columns/${columnId}/card-image`,
    { image: data },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};
