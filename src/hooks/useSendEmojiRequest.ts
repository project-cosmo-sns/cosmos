import { EmojiCode } from '@/@types/type';
import fetchData from '@/api/fetchData';
import { useMutation } from '@tanstack/react-query';

export default function useSendEmojiRequest({
  id,
  isPost = false,
}: {
  id: number;
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
  });

  const { mutate: deleteEmojiMutate, isPending: isDeletePending } = useMutation(
    {
      mutationFn: (emojiCode: EmojiCode) =>
        fetchData({
          param: `/${isPost ? 'post' : 'feed'}/${id}/emoji/${emojiCode}`,
          method: 'delete',
        }),
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
