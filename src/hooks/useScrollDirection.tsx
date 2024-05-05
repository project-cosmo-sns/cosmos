import { useState, useEffect } from 'react';

const useScrollDirection = (initialValue: string) => {
  // 스크롤 방향
  // 네브바 초기 설정에 필요한 initialValue ("up" 또는 "down")
  const [scrollDirection, setScrollDirection] = useState(initialValue);

  useEffect(() => {
    let lastScrollY = window.pageYOffset; // 현재 스크롤 위치

    /** 스크롤 방향을 업데이트 하는 함수 */
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return [scrollDirection, setScrollDirection];
};

export default useScrollDirection;
