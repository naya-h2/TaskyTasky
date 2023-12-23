import axios from 'axios';
import { PostColumnImageRequestType } from '@/lib/types/columns';

/**
 * 카드 이미지 업로드
 */
export const uploadCardImg = async (columnId: number, data: PostColumnImageRequestType) => {
  const response = await axios.post(`/api/columns/${columnId}.card-image`, data);
  console.log(response);
  return response.data;
};
