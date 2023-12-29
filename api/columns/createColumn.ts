import { PostColumnRequestType } from '@/lib/types/columns';
import instance from '@/lib/axios';

/**
 * 칼럼 생성
 */
export const createColumn = async (data: PostColumnRequestType) => {
  const response = await instance.post('/api/columns', data);
  return response.data;
};
