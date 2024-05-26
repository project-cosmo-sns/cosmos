import fetchData from '@/api/fetchData';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './useToast';

export default function useSendScrapRequest({ postId }: { postId: number }) {
  const { showToastHandler } = useToast();

  const { mutate: addScrapMutate, isPending: isAddPending } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}/scrap`,
        method: 'post',
      }),
    onSuccess: () => {
      showToastHandler('스크랩에 저장되었습니다.', 'check');
    },
  });

  const { mutate: deleteScrapMutate, isPending: isDeletePending } = useMutation(
    {
      mutationFn: () =>
        fetchData({
          param: `/post/${postId}/scrap`,
          method: 'delete',
        }),
    },
  );

  const handleScrapClick = (isClicked: boolean) => {
    if (isClicked) {
      deleteScrapMutate();
      return;
    }
    addScrapMutate();
  };

  return { handleScrapClick, isAddPending, isDeletePending };
}
