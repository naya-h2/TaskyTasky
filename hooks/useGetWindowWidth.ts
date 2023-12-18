import { useEffect, useState } from 'react';

/**
 * @returns 현재 윈도우 창크기의 innerWidth값
 */
const useGetWindowWidth = () => {
  if (!window) return 1920;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeListener);
  });
  return innerWidth;
};

export default useGetWindowWidth;
