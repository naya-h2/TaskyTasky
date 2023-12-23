import axios from 'axios';

/**
 * 컬럼 삭제
 */
export const deleteColumn = async (columnId: number) => {
  const response = await axios.delete(`/api/columns/${columnId}`);
};
