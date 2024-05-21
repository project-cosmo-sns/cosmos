import { useMutation } from '@tanstack/react-query';
import fetchData from './fetchData';

/**
 *  회원인증 데이터 전송
 * @returns
 */

interface FetchDataResponse {
  uploadURL: string;
}

type sendAuthData = {
  generation: number;
  name: string;
  image: string | null;
};

export default async function getImageUrl() {
  try {
    const response = (await fetchData({
      param: '/authorization/image/create',
    })) as FetchDataResponse;
    const { uploadURL } = response;
    return uploadURL;
  } catch (error) {
    console.error('GetUploadUrl 에러: ', error);
    throw error;
  }
}

export async function s3UploadImage(file: File) {
  const uploadUrl = await getImageUrl();
  if (!uploadUrl) {
    console.error('업로드 URL GET 실패');
    return null;
  }

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file, // 업로드할 파일
      headers: {
        'Content-Type': file.type, // 파일 타입 지정
      },
    });

    if (response.ok) {
      return uploadUrl.split('?')[0]; // 업로드된 이미지의 S3 URL을 반환
    }
    console.error('Upload failed:', response);
    return null;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export function useSendAuthData() {
  const { mutate: sendAuth } = useMutation({
    mutationFn: ({ generation, name, image }: sendAuthData) =>
      fetchData({
        param: '/authorization',
        method: 'post',
        requestData: {
          generation,
          name,
          imageUrl: image,
        },
      }),
  });
  return sendAuth;
}

export function useDeleteAuthData() {
  const { mutate: deleteAuth } = useMutation({
    mutationFn: () =>
      fetchData({
        param: '/authorization/iamge/delete',
        method: 'delete',
      }),
  });
  return deleteAuth;
}
