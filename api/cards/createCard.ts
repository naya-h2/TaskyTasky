import instance from '@/lib/axios';
import { PostCardRequestType } from '@/lib/types/cards';

/**
 * 카드 생성
 */
export const createCard = async (data: PostCardRequestType) => {
  const response = await instance.post('/api/cards', data);
<<<<<<< HEAD
=======
  console.log(response);
>>>>>>> 6398922 (Feat: 새컬럼추가 API 연결 완료)
  return response.data;
};
