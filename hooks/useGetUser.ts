import { useEffect } from 'react';
import { useStore } from '@/context/stores';
import { getUserInfo } from '@/api/users/getUserInfo';

/**
 * 유저 정보를 가져와서 user(전역 state)를 업데이트하는 커스텀훅
 */
export const useGetUser = () => {
  const { user, setUser } = useStore((state) => ({ user: state.user, setUser: state.setUser }));

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserInfo();
      setUser(response);
    };

    fetchUser();
  }, []);

  return user;
};
