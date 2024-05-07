import fetchData from '@/api/fetchData';

export default function GetProfileImageUrl(file: File) {
  const profileImageData = fetchData({
    param: '/profile/image/create',
    requestData: file,
  });
  return profileImageData;
}
