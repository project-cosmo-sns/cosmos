import styles from './Toast.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);
/**
 * Toast 컴포넌트 사용시 setTimeout을 이용하여 6000ms 후에 사라지도록 하는게 좋을 것 같아요
 */

type toastType = {
  text: string;
  icon: string | React.ElementType;
};

export default function Toast({ text, icon: Icon }: toastType) {
  return (
    <div className={cn('toast-container')}>
      <Icon />
      {text}
    </div>
  );
}
