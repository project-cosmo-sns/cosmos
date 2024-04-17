import classNames from 'classnames/bind';
import styles from './NoticeButton.module.scss';
import NoticeButtonType from './NoticeButtonType';
import { useState } from 'react';

/**
 * @param {function} onClick : 버튼 클릭 시 동작할 로직
 * @returns button
 */

const cn = classNames.bind(styles);

export default function NoticeButton({ onClick }: NoticeButtonType) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(!isActive);
    if (onClick) onClick(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn('notice-button', { isActive })}
    >
      공지사항
    </button>
  );
}
