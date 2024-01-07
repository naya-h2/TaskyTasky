import axios from 'axios';
import { PostSignUpRequestType } from '@/lib/types/users';

// /**
//  * 회원가입
//  */
export const createUser = async (data: PostSignUpRequestType) => {
  try {
    const response = await axios.post('/api/vercel/users', data);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('회원가입에 실패했습니다.');
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 409) {
        throw new Error('이미 사용 중인 이메일입니다.');
      } else {
        throw new Error('회원가입 처리 중 오류가 발생했습니다.');
      }
    } else {
      throw error;
    }
  }
};
