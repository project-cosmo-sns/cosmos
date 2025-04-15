import axios from 'axios';
import pLimit from 'p-limit';
import { useMutation } from '@tanstack/react-query';
import { useCreateFeedRequest } from '@/hooks/useCreateFeedRequest';

// presignedURL 서버로부터 발급
// S3 서버에 이미지 업로드
function useImageUpload() {
  // presignedURL 서버로부터 발급
  const { getUrl } = useCreateFeedRequest();
  const getUrlRequest = async () => {
    const { data } = await getUrl();
    const uploadUrl = String(data?.uploadURL);
    return uploadUrl;
  };

  const putUrlMutate = useMutation({
    mutationFn: ({ url, file }: { url: string; file: Blob }) =>
      axios({
        method: 'put',
        url: `${url}`,
        data: file,
        headers: {
          'Access-Control-Allow-Origin': 'https://alpha.cosmo-sns.com',
        },
      }),
    onError: () => {
      console.error('에러');
    },
  });

  const putUrl = (url: string, file: Blob) => {
    putUrlMutate.mutate({ url, file });
  };

  const requestPresignedUrl = async (fileList: Blob[]) => {
    const limit = pLimit(1);
    // 프로젝트 서버로 url 발급요청 (반환된 promise 객체가 순서를 지켜서 반환된다. (비동기 처리의 동기 처리를 위해))
    const urlPromises = fileList.map(() => limit(() => getUrlRequest()));
    const urlList: string[] = await Promise.all(urlPromises);
    return urlList;
  };

  const uploadToS3 = async (urlList: string[], fileList: Blob[]) => {
    const limit = pLimit(1);
    // s3 서버로 이미지 등록 요청
    const uploadedUrlList = await Promise.all(
      urlList.map((url, i) =>
        limit(() => putUrl(url, fileList[i])).then(() => url),
      ),
    );

    const splitedUrlList = uploadedUrlList.map(
      (uploadedUrl) => uploadedUrl.split('?')[0],
    );

    return splitedUrlList;
  };

  return { requestPresignedUrl, uploadToS3 };
}

export default useImageUpload;
