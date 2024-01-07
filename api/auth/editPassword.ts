import axios from 'axios';
import { PutPasswordRequestType } from '@/lib/types/auth';
import authInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';

/**
 * 비밀번호 변경
 */
export const editPassword = async (data: PutPasswordRequestType) => {
  try {
    const response = await authInstance.put('/api/vercel/auth/password', data);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
