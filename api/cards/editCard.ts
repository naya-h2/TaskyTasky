import instance from '@/lib/axios';
import { PutCardRequestType } from '@/lib/types/cards';

/**
 * 카드 수정
 */
export const editCard = async (cardId: number, data: PutCardRequestType) => {
  const response = await instance.put(`/api/vercel/cards/${cardId}`, data);
  return response.data;
};
