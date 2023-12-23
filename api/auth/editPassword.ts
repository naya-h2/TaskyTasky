import axios from 'axios';
import { PutPasswordRequestType } from '@/lib/types/auth';
import instance from '@/lib/axios';

/**
 * 비밀번호 변경
 */
export const editPassword = async (data: PutPasswordRequestType) => {
  try {
    const response = await instance.put('/api/auth/password', data);
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMsg = error.response.data.message;
    console.log(errorMsg);
    return errorMsg;
  }
};
