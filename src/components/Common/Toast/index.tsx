import styles from './Toast.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function Toast() {
  return (
    <div className={cn('toast-container')}>인증 신청이 완료되었습니다.</div>
  );
}
