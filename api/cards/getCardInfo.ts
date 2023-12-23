import axios from 'axios';

/**
 * 카드 상세 조회
 */
export const getCard = async (cardId: number) => {
  const response = await axios.get(`/api/cards/${cardId}`);
  console.log(response);
  return response.data;
};
