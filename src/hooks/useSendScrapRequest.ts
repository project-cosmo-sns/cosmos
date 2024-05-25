import fetchData from '@/api/fetchData';
import { useMutation } from '@tanstack/react-query';

export default function useSendScrapRequest({ postId }: { postId: number }) {
  const { mutate: addScrapMutate, isPending: isAddPending } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}/scrap`,
        method: 'post',
      }),
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
