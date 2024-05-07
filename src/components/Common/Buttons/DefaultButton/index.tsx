import classNames from 'classnames/bind';
import styles from './DefaultButton.module.scss';

interface DefaultButtonType {
  children: string;
  buttonType?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size: 'small' | 'medium' | 'large' | 'modal';
  color: string;
}

const cn = classNames.bind(styles);

/**
 *
 * @param {string} children : 버튼 텍스트
 * @param {string} buttonType : 버튼 타입 설정 - button / submit (기본값 button)
 * @param {function} onClick : 버튼 클릭시 동작할 로직
 * @param {string} size : 버튼 크기 선택 - small / medium / large / modal(모달용380px)
 * @param {string} color : 버튼 색상 설정 (컬러 변수 값 입력 ex)'primary-01')
 * @returns button
 */

export default function DefaultButton({
  children,
  buttonType = 'button',
  onClick,
  size,
  color,
}: DefaultButtonType) {
  return (
    <button
      type={buttonType === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={cn('default-button', size, color)}
    >
      {children}
    </button>
  );
}
