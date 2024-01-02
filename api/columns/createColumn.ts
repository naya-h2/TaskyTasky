import { PostColumnRequestType } from '@/lib/types/columns';
import authInstance from '@/lib/axios';

/**
 * 칼럼 생성
 */
export const createColumn = async (data: PostColumnRequestType) => {
  const response = await authInstance.post('/api/columns', data);
  return response.data;
};
