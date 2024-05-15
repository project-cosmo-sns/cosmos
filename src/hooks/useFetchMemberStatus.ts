import fetchData from '@/api/fetchData';
import { useQuery } from '@tanstack/react-query';
import { useOpenLoginModal } from './useOpenLoginModal';
import { useToast } from './useToast';

/**
 * @param {Function} callback - 인증된 사용자일 경우 실행할 함수
 * const { checkMemberStatus } = useFetchMemberStatus(callback);
 */

export function useFetchMemberStatus() {
  const { showToastHandler } = useToast();
  const { showLoginModalHandler } = useOpenLoginModal();

  const { data, isSuccess } = useQuery<{
    isLogin: boolean;
    isAuthorized: boolean;
  }>({
    queryKey: ['status'],
    queryFn: () => fetchData({ param: '/member/status' }),
  });

  const checkMemberStatus = (callback: () => void) => {
    if (isSuccess) {
      if (data.isLogin) {
        if (!data.isAuthorized) {
          showToastHandler('인증된 사용자만 확인할 수 있습니다', 'warn');
        } else {
          callback();
        }
      } else {
        showLoginModalHandler();
      }
    }
  };

  return { checkMemberStatus };
}
