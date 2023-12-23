import axios from 'axios';

/**
 * 카드 삭제
 */
export const deleteCard = async (cardId: number) => {
  const response = await axios.delete(`/api/cards/${cardId}`);
};
