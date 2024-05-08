import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';

/**
 * 팔로우 버튼 클릭을 처리하는 커스텀 훅입니다.
 * @param {number} memberId -  멤버의 ID입니다.
 * @returns {Object} 현재 팔로우 상태와 팔로우 상태를 토글하는 함수를 포함하는 객체를 반환합니다.
 */

export default function useFollowClick(memberId: number) {
  const [isActive, setIsActive] = useState(false);
  const { mutate: addFollow } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/follow/${memberId}`,
        method: 'post',
      }),
  });
  const { mutate: deleteFollow } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/follow/${memberId}`,
        method: 'delete',
      }),
  });

  const toggleFollow = async () => {
    setIsActive((prev) => !prev);

    if (!isActive) {
      await addFollow();
    } else {
      await deleteFollow();
    }
  };

  return { isActive, toggleFollow };
}
