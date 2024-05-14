import { useMutation } from '@tanstack/react-query';
import { FeedType } from '@/components/Feed/CreateFeed/type';
import fetchData from '@/api/fetchData';
import { Dispatch, SetStateAction } from 'react';

interface CreateFeedType {
  content: string;
  imageUrls: string[];
}

export async function useRefetchFeed(
  toggleModal?: Dispatch<SetStateAction<boolean>>,
) {
  const { mutate: postFeed, isSuccess: isCreateFeedSucces } = useMutation({
    mutationFn: async (data: FeedType) =>
      fetchData<CreateFeedType>({
        param: '/feed',
        method: 'post',
        requestData: {
          content: data.content,
          imageUrls: data.feedImage,
        },
      }),
    onSuccess: () => {
      toggleModal && toggleModal(false);
    },
  });

  return { postFeed, isCreateFeedSucces };
}
