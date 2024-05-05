import classNames from 'classnames/bind';
import styles from './FollowButton.module.scss';
import FollowButtonType from './FollowButtonType';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addFollow, deleteFollow } from '@/api/Follow';

/**
 * @param {function} onClick : 버튼 클릭 시 동작할 로직
 * @param {boolean} isFollow : 팔로우 버튼인지 삭제 버튼인지 구분 , true: 팔로우/팔로잉 버튼 , false: 삭제 버튼
 * @returns button
 */

const cn = classNames.bind(styles);

export default function FollowButton({ onClick, isFollow }: FollowButtonType) {
  const [isActive, setIsActive] = useState(false);

  const memberId = 1;

  const { mutate: mutateAdd } = useMutation({
    mutationFn: addFollow,
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteFollow,
  });

  // const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  //   e.preventDefault();
  //   setIsActive(!isActive);
  //   onClick(memberId, isActive); // onClick prop으로 전달받은 함수를 호출
  // };

  return isFollow === true ? (
    <button
      type="button"
      onClick={onClick}
      className={cn('follow-button', { isActive })}
    >
      {isActive ? '팔로우' : '팔로잉'}
    </button>
  ) : (
    <button type="button" className={cn('delete-button')}>
      삭제
    </button>
  );
}
