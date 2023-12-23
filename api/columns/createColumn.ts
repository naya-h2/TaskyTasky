import { PostColumnRequestType } from '@/lib/types/columns';
import axios from 'axios';

/**
 * 칼럼 생성
 */
export const createColumn = async (data: PostColumnRequestType) => {
  const response = await axios.post('/api/columns', data);
  return response.data;
};
