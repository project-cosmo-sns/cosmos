import { useDispatch } from 'react-redux';
import { showToast } from '@/redux/toastSlice';

/**
 * @param {string} text - text 속성은 토스트에 표시할 텍스트
 * @param { React.ReactNode} icon - icon 속성은 토스트에 표시할 아이콘
 * @returns {function} showToastHandler - 토스트를 보여주는 함수
 * @example
 * const { showToastHandler } = useToast();
 * showToastHandler('인증이 신청이 완료되었습니다.', 'check' 또는 'warn');
 */

export const useToast = () => {
  const dispatch = useDispatch();
  const showToastHandler = (text: string, type: string) => {
    dispatch(
      showToast({
        text,
        type,
      }),
    );
  };
  return { showToastHandler };
};
