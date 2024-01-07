import axios from 'axios';

/**
 * 카드 상세 조회
 */
export const getCard = async (cardId: number) => {
  try {
    const response = await axios.get(`/api/vercel/cards/${cardId}`);
    return response.data;
  } catch (error) {}
};
