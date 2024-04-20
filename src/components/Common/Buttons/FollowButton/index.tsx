import classNames from 'classnames/bind';
import styles from './FollowButton.module.scss';
import FollowButtonType from './FollowButtonType';
import { useState } from 'react';

/**
 * @param {function} onClick : 버튼 클릭 시 동작할 로직
 * @param {boolean} isFollow : 팔로우 버튼인지 삭제 버튼인지 구분 , true: 팔로우/팔로잉 버튼 , false: 삭제 버튼
 * @returns button
 */

const cn = classNames.bind(styles);

export default function FollowButton({ onClick, isFollow }: FollowButtonType) {
  const [isActive, setIsActive] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsActive(!isActive);
    if (onClick) onClick(e);
  };

  return isFollow ? (
    <button
      type="button"
      onClick={handleClick}
      className={cn('follow-button', { isActive })}
    >
      {isActive ? '팔로잉' : '팔로우'}
    </button>
  ) : (
    <button type="button" className={cn('delete-button')}>
      삭제
    </button>
  );
}
