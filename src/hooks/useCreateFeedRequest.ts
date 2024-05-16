import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import { UrlType, FeedType } from '@/components/Feed/CreateFeed/type';
import axios from 'axios';
import { baseURL } from '@/api/axios';
import { Dispatch, SetStateAction } from 'react';
import { useToast } from './useToast';

export function useCreateFeedRequest(
  toggleModal?: Dispatch<SetStateAction<boolean>>,
) {
  const { showToastHandler } = useToast();
  const queryClient = useQueryClient();
  const { refetch: getUrl } = useQuery<UrlType>({
    queryKey: ['signedUrl'],
    queryFn: () =>
      fetchData({
        param: 'feed/image/create',
      }),
    enabled: false,
  });

  const deleteUrlMutate = useMutation({
    mutationFn: (url: string) =>
      axios({
        method: 'delete',
        url: `${baseURL}/feed/image/delete?imageUrls[]=${url}`,
        headers: {
          'Access-Control-Allow-Origin': 'https://alpha.cosmo-sns.com',
        },
        withCredentials: true,
      }),
    onError: () => console.log('이미지 삭제 요청 에러 '),
    onSuccess: () => console.log('이미지 삭체 요청 성공'),
  });

  const deleteImage = (url: string) => {
    deleteUrlMutate.mutate(url);
  };

  const { mutate: postFeed, isSuccess } = useMutation({
    mutationFn: (data: FeedType) =>
      fetchData({
        param: '/feed',
        method: 'post',
        requestData: {
          content: data.content,
          imageUrls: data.feedImage,
        },
      }),
    onError: () => console.log('피드 등록에 실패하였습니다.'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['feedList'],
      });
      showToastHandler('피드 작성 완료!', 'check');
      if (toggleModal) toggleModal(false);
    },
  });

  return {
    getUrl,
    deleteImage,
    postFeed,
    isSuccess,
  };
}
