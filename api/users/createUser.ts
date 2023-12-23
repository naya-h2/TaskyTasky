import axios from 'axios';
import { PostSignupRequestType } from '@/lib/types/users';

/**
 * 회원가입
 */
export const createUser = async (data: PostSignupRequestType) => {
  try {
    const response = await axios.post('/api/users', data);
    console.log(response.data);
    alert('회원가입 성공!');
    return response.data;
  } catch (error) {
    const errorMsg = error.response.data.message;
    return errorMsg;
  }
};
