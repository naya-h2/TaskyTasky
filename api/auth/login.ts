import axios from 'axios';
import { Login } from '@/lib/types/type';

export const login = async (data: Login) => {
  try {
    const response = await axios.post('/api/auth/login', data);
    if (response.status === 201) window.localStorage.setItem('login', response.data.accessToken);
    alert('로그인 성공!');
    return response.data;
  } catch (error: any) {
    const errorMsg = error.response.data.message;
    console.log(errorMsg);
    return errorMsg;
  }
};
