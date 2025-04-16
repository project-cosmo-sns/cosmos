import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { useToast } from '@/hooks/useToast';
import useImageUpload from './useImageUpload';
import { FeedFormController } from '../type';

export interface useFeedImageUploadProps {
  images: Blob[];
  setImages: React.Dispatch<React.SetStateAction<Blob[]>>;
  getValues: UseFormGetValues<FeedFormController>;
  setValue: UseFormSetValue<FeedFormController>;
  setUrlBucket: React.Dispatch<React.SetStateAction<string[]>>;
}

function useFeedImageUpload({
  images,
  setImages,
  getValues,
  setValue,
  setUrlBucket,
}: useFeedImageUploadProps) {
  const { requestPresignedUrl, uploadToS3 } = useImageUpload();
  const { showToastHandler } = useToast();
  // 이미지 업로드 함수
  const uploadFile = async (fileList: Blob[]) => {
    const currentImageValue = [...images, ...fileList];
    setImages(currentImageValue);

    try {
      const presignedUrlList = await requestPresignedUrl(fileList);
      const uploadedUrlList = await uploadToS3(presignedUrlList, fileList);

      const prevFeedImage = getValues('feedImage');
      setValue('feedImage', [...prevFeedImage, ...uploadedUrlList]);
      setUrlBucket((prev) => [...prev, ...uploadedUrlList]);
    } catch (error) {
      showToastHandler('이미지 업로드 실패', 'warn');
    }
  };
  return { uploadFile };
}

export default useFeedImageUpload;
