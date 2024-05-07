import fetchData from '@/api/fetchData';
import axios from 'axios';

async function uploadImageToS3(url: string, file: File) {
  try {
    const response = await axios.put(url, file);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// eslint-disable-next-line consistent-return
export default async function createPresinedURL(file: File) {
  try {
    const response: {
      uploadURL: string;
    } = await fetchData({
      param: '/post/image/create',
    });
    if (response?.uploadURL) {
      const s3Response = await uploadImageToS3(response.uploadURL, file);
      if (s3Response) {
        console.log(s3Response);
        return response.uploadURL;
      }
      throw new Error();
    }
  } catch (error) {
    console.error(error);
  }
}
