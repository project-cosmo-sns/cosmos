import { EmojiCode } from '@/@types/type';
import fetchData from '@/api/fetchData';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

export default function useSendEmojiRequest<T>({
  id,
  refetch,
  isPost = false,
}: {
  id: number;
  refetch?: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<T, Error>>;
  isPost: boolean;
}) {
  const { mutate: addEmojiMutate, isPending: isAddPending } = useMutation({
    mutationFn: (emojiCode: EmojiCode) =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/${id}/emoji`,
        method: 'post',
        requestData: {
          emoji: emojiCode,
        },
      }),
    onSuccess: () => {
      if (refetch) refetch();
    },
  });

  const { mutate: deleteEmojiMutate, isPending: isDeletePending } = useMutation(
    {
      mutationFn: (emojiCode: EmojiCode) =>
        fetchData({
          param: `/${isPost ? 'post' : 'feed'}/${id}/emoji/${emojiCode}`,
          method: 'delete',
        }),
      onSuccess: () => {
        if (refetch) refetch();
      },
    },
  );

  const handleEmojiClick = (emojiCode: EmojiCode, isClicked: boolean) => {
    if (isClicked) {
      deleteEmojiMutate(emojiCode);
      return;
    }
    addEmojiMutate(emojiCode);
  };

  return { handleEmojiClick, isAddPending, isDeletePending };
}
