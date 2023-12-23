import axios from 'axios';
import { PutCardRequestType } from '@/lib/types/cards';

/**
 * 카드 수정
 */
export const editCard = async (cardId: number, data: PutCardRequestType) => {
  const response = await axios.put(`/api/cards/${cardId}`, data);
  console.log(response);
  return response.data;
};
