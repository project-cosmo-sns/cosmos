import classNames from 'classnames/bind';
import styles from './FollowButton.module.scss';
import FollowButtonType from './FollowButtonType';
import { useState } from 'react';

/**
 * @param {function} onClick : 버튼 클릭 시 동작할 로직
 * @returns button
 */

const cn = classNames.bind(styles);

export default function FollowButton({ onClick }: FollowButtonType) {
  const [isActive, setIsActive] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsActive(!isActive);
    if (onClick) onClick(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn('follow-button', { isActive })}
    >
      {isActive ? '팔로잉' : '팔로우'}
    </button>
  );
}
