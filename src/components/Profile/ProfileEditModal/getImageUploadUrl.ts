import fetchData from '@/api/fetchData';

interface FetchDataResponse {
  uploadURL: string;
}

// 이 과정을 통해서는 이미지 url을 받는게 아니다.
// 그냥 S3버킷에 업로드 가능한 pre-signed URL만 받고
// 이걸 이용해서 이미지를 S3에 업로드하는것
export default async function GetUploadUrl() {
  try {
    const response = (await fetchData({
      param: '/profile/image/create',
    })) as FetchDataResponse;

    const { uploadURL } = response;
    return uploadURL;
  } catch (error) {
    console.error('GetUploadUrl 에러: ', error);
    throw error;
  }
}
