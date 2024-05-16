import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';

/**
 * 팔로우 버튼 클릭을 처리하는 커스텀 훅입니다.
 * @param {number} memberId -  멤버의 ID입니다.
 * @param {boolean} isFollowing? - 초기 팔로우 상태입니다.
 * @returns {Object} 현재 팔로우 상태와 팔로우 상태를 토글하는 함수를 포함하는 객체를 반환합니다.
 */

export default function useFollowClick(
  memberId: number | undefined,
  isFollowing = false,
) {
  const [isActive, setIsActive] = useState(isFollowing);

  const queryClient = useQueryClient();

  interface FollowResponse {
    isFollowed: boolean;
  }

  const { data: checkFollowStatus } = useQuery({
    queryKey: ['followStatus', memberId],
    queryFn: () => {
      return fetchData({
        param: `/profile/${memberId}`,
      }) as Promise<FollowResponse>;
    },
  });

  const { mutate: addFollow } = useMutation({
    mutationFn: () => {
      if (!memberId) return Promise.resolve();
      return fetchData({
        param: `/follow/${memberId}`,
        method: 'post',
      });
    },
    onSuccess: () => {
      if (memberId) {
        queryClient.invalidateQueries({ queryKey: ['followStatus', memberId] });
      }
    },
  });

  const { mutate: deleteFollow } = useMutation({
    mutationFn: () => {
      if (!memberId) return Promise.resolve();
      return fetchData({
        param: `/follow/${memberId}`,
        method: 'delete',
      });
    },
    onSuccess: () => {
      if (memberId) {
        queryClient.invalidateQueries({ queryKey: ['followStatus', memberId] });
      }
    },
  });

  useEffect(() => {
    if (memberId && checkFollowStatus) {
      setIsActive(checkFollowStatus.isFollowed);
    }
  }, [memberId, checkFollowStatus]);

  if (!memberId) {
    return { isActive: false, toggleFollow: () => {} };
  }

  const toggleFollow = async () => {
    if (!isActive) {
      addFollow();
    } else {
      deleteFollow();
    }
  };

  return { isActive, toggleFollow };
}
