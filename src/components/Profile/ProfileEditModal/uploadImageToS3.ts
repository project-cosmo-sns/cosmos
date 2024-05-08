import fetchData from '@/api/fetchData';
import GetImageUploadUrl from './getImageUploadUrl';

export async function uploadImageToS3(file: File) {
  const uploadUrl = await GetImageUploadUrl();
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
      console.log('이미지 업로드 성공');
      return uploadUrl.split('?')[0]; // 업로드된 이미지의 S3 URL을 반환
      // return uploadUrl;
    }
    console.error('Upload failed:', response);
    return null;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}
