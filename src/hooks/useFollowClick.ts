import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';

/**
 * 팔로우 버튼 클릭을 처리하는 커스텀 훅입니다.
 * @param {number} memberId -  멤버의 ID입니다.
 * @returns {Object} 현재 팔로우 상태와 팔로우 상태를 토글하는 함수를 포함하는 객체를 반환합니다.
 */

export default function useFollowClick(memberId: number) {
  const [isActive, setIsActive] = useState(false);
  const queryClient = useQueryClient();

  interface FollowResponse {
    isFollowed: boolean;
  }

  const checkFollowStatus = async () => {
    try {
      const response = (await fetchData({
        param: `/profile/${memberId}`,
      })) as FollowResponse;
      setIsActive(response.isFollowed);
    } catch (error) {
      console.error('팔로우 상태 확인 중 오류 발생');
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, [memberId]);

  const { mutate: addFollow } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/follow/${memberId}`,
        method: 'post',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followStatus', memberId] });
      handleSuccess();
    },
  });

  const { mutate: deleteFollow } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/follow/${memberId}`,
        method: 'delete',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followStatus', memberId] });
      handleSuccess();
    },
  });

  // 팔로우 성공 후, 팔로우 상태를 다시 확인하는 함수
  const handleSuccess = async () => {
    await checkFollowStatus();
  };

  const toggleFollow = async () => {
    // setIsActive((prev) => !prev);
    if (!isActive) {
      addFollow();
    } else {
      deleteFollow();
    }
  };

  return { isActive, toggleFollow };
}
