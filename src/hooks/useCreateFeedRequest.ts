import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import { UrlType, FeedType } from '@/components/Feed/CreateFeed/type';
import axios from 'axios';
import { baseURL } from '@/api/axios';
import { useToast } from './useToast';
import { useDispatch } from 'react-redux';
import { handleCreateFeedModal } from '@/redux/createFeedModalSlice';
import { useRouter } from 'next/router';

export function useCreateFeedRequest() {
  const dispatch = useDispatch();
  const router = useRouter();
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
    onError: () => console.error('이미지 삭제 요청 에러 '),
    onSuccess: () => console.error('이미지 삭체 요청 성공'),
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
    onError: () => console.error('피드 등록에 실패하였습니다.'),
    onSuccess: () => {
      // 요청에 성공하면 토스트를 출력하고 피드 생성 모달 출력을 비활성화 합니다.
      // FeedList도 invalidate 합니다.
      showToastHandler('피드 작성 완료!', 'check');
      dispatch(handleCreateFeedModal(false));
      router.push('/?tab=feed');
      queryClient.invalidateQueries({
        queryKey: ['feedList'],
      });
    },
  });

  return {
    getUrl,
    deleteImage,
    postFeed,
    isSuccess,
  };
}
