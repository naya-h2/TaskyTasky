import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = ({ callbackFunc }: { callbackFunc: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const targetRef = useRef(null);
  let observer: IntersectionObserver;

  const observe = () => {
    if (targetRef.current && !isLoading) {
      observer.observe(targetRef?.current);
    }
  };

  const unobserve = () => {
    if (targetRef.current) {
      observer.unobserve(targetRef.current);
    }
  };

  useEffect(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          callbackFunc();
        }
      },
      { root: null, threshold: 0.1 },
    );

    observe();

    return () => unobserve();
  }, []); // 의존성 배열에서 isLoading 제거

  useEffect(() => {
    if (isLoading) {
      unobserve();
    } else {
      observe();
    }
  }, [isLoading]); // isLoading 상태에 따라 observer 시작/중지

  return {
    setIsLoading,
    targetRef,
  };
};
