import { PostCardRequestType } from '@/lib/types/cards';
import axios from 'axios';

/**
 * 카드 생성
 */
export const createCard = async (data: PostCardRequestType) => {
  const response = await axios.post('/api/cards', data);
  console.log(response);
  return response.data;
};
