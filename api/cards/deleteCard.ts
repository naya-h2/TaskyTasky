import instance from '@/lib/axios';

/**
 * 카드 삭제
 */
export const deleteCard = async (cardId: number) => {
  const response = await instance.delete(`/api/vercel/cards/${cardId}`);
};
