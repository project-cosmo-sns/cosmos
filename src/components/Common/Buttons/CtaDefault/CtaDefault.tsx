import classNames from 'classnames/bind';
import styles from './CtaDefault.module.scss';
import CtaDefaultType from './CtaDefaultType';

/**
 *
 * @param {string} children : 버튼 텍스트
 * @param {string} type : 버튼 타입 설정 (기본값 button)
 * @param {function} onClick : 버튼 클릭시 동작할 로직
 * @param {string} size : 버튼 크기 선택 - small / medium / large
 * @param {string} color : 버튼 색상 설정 - purple / lightgray (기본 색상 : purple-#9747ff))
 * @returns button
 */

const cn = classNames.bind(styles);

export default function CtaDefault({
  children,
  type = 'button',
  onClick,
  size,
  color,
}: CtaDefaultType) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn('create-button', size, color)}
    >
      {children}
    </button>
  );
}
