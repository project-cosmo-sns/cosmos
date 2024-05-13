import { useQuery, useMutation } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import { UrlType, FeedType } from '@/components/Feed/CreateFeed/type';
import axios from 'axios';
import { baseURL } from '@/api/axios';
import { useRouter } from 'next/router';

export function useCreateFeedRequest() {
  const router = useRouter();
  const { refetch: getUrl } = useQuery<UrlType>({
    queryKey: ['signedUrl'],
    queryFn: () =>
      fetchData({
        param: 'feed/image/create',
      }),
    enabled: false,
  });
  // https://api-alpha.cosmo-sns.com/profile/image/delete?imageUrls[]=${encodeURIComponent(imageName)}
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

  const postFeedMutataion = useMutation({
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
    onSuccess: () => router.push('/?tab=feed'),
  });

  const postFeed = (data: FeedType) => {
    postFeedMutataion.mutate(data);
  };

  return {
    getUrl,
    deleteImage,
    postFeed,
  };
}
