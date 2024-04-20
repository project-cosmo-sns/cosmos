import { useEffect } from 'react';
import { useOutSideClickProps } from '@/@types/type';

/**
 * 여백 클릭해서 팝업창이나 모달 닫기
 * @param {React.RefObject<HTMLDivElement>} ref- 감지할 요소의 ref
 * @param {() => void} callback - 감지되었을 때 실행할 콜백
 */

export default function useOutSideClick({
  ref,
  callback,
}: useOutSideClickProps) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
}
