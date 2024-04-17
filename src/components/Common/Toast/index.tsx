import styles from './Toast.module.scss';
import classNames from 'classnames/bind';

/**
 * Toast 컴포넌트 사용시 setTimeout을 이용하여 6000ms 후에 사라지도록 하는게 좋을 것 같아요 
 */

const cn = classNames.bind(styles);

export default function Toast() {
  return (
    <div className={cn('toast-container')}>인증 신청이 완료되었습니다.</div>
  );
}
