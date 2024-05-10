import styles from './Toast.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '@/redux/toastSlice';
import { RootState } from '@/redux/store';

const cn = classNames.bind(styles);
/**
 * @param {string} text - text 속성은 토스트에 표시할 텍스트
 * @param { React.ReactNode} icon - icon 속성은 토스트에 표시할 아이콘
 * @param {string} fill - fill 속성은 icon의 색상을 변경할 때 사용 (#0ACF83 인증완료)
 */

export default function Toast() {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.toast.visible);
  const icon = useSelector((state: RootState) => state.toast.icon);
  const text = useSelector((state: RootState) => state.toast.text);

  const hideTimeOut = setTimeout(() => {
    dispatch(hideToast());
  }, 3000);

  useEffect(() => {
    clearTimeout(hideTimeOut);
  }, [dispatch]);

  return (
    <>
      {visible && (
        <div className={cn('toast-container')}>
          {icon}
          {text}
        </div>
      )}
    </>
  );
}
