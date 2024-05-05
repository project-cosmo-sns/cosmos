import styles from './Toast.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);
/**
 * Toast 컴포넌트 사용시 setTimeout을 이용하여 5000ms 후에 사라지도록 하는게 좋을 것 같아요
 * @param {string} text - text 속성은 토스트에 표시할 텍스트
 * @param {string | React.ElementType} icon - icon 속성은 토스트에 표시할 아이콘
 * @param {string} fill - fill 속성은 icon의 색상을 변경할 때 사용 (#0ACF83 인증완료)
 */

type toastType = {
  isVisible: boolean;
  text: string;
  icon: string | React.ElementType;
  fill?: string;
};

export default function Toast({
  isVisible,
  text,
  icon: Icon,
  fill,
}: toastType) {
  return (
    isVisible && (
      <div className={cn('toast-container')}>
        <Icon fill={fill} />
        {text}
      </div>
    )
  );
}
