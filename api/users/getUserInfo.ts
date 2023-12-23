import axios from 'axios';

/**
 * 내 정보 조회
 */
export const getUserInfo = async () => {
  const response = await axios.get(`/api/users/me`);
  console.log(response);
  return response.data;
};
