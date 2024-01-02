import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useCheckLogin = () => {
  const router = useRouter();

  useEffect(() => {
    if (window && !window.localStorage.getItem('login')) router.push('/404');
  }, []);
};
