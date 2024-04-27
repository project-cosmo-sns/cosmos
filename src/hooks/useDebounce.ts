import { useEffect, useState } from 'react';

/**
 * 디바운스를 적용하여 지연된 값을 반환하는 훅입니다.
 * @param {string} value - 디바운스를 적용할 값
 * @param {number} delay - 디바운스 지연 시간 (밀리초)
 * @returns {string} - 디바운스가 적용된 값
 */
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
