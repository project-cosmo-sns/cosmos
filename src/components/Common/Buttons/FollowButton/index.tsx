import classNames from 'classnames/bind';
import styles from './FollowButton.module.scss';
import FollowButtonType from './FollowButtonType';

/**
 * @param {function} onClick : 버튼 클릭 시 동작할 로직
 * @param {boolean} isFollow : 팔로우 버튼인지 삭제 버튼인지 구분 , true: 팔로우/팔로잉 버튼 , false: 삭제 버튼
 * @param {boolean} isActive : 팔로우 버튼의 활성화 여부
 * @returns button
 */

const cn = classNames.bind(styles);

export default function FollowButton({
  onClick,
  isFollowButton,
  isActive,
}: FollowButtonType) {
  const handleClick = () => {
    onClick(isActive || false);
  };

  return isFollowButton === true ? (
    <button
      type="button"
      onClick={handleClick}
      className={cn('follow-button', { isActive })}
    >
      {isActive ? '팔로우' : '팔로잉'}
    </button>
  ) : (
    <button type="button" className={cn('delete-button')} onClick={onClick}>
      삭제
    </button>
  );
}
