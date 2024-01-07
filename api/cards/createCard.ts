import instance from '@/lib/axios';
import { PostCardRequestType } from '@/lib/types/cards';

/**
 * 카드 생성
 */
export const createCard = async (data: PostCardRequestType) => {
  const response = await instance.post('/api/vercel/cards', data);
  return response.data;
};
