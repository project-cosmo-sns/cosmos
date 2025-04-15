import { UseFormSetValue } from 'react-hook-form';

import { useCreateFeedRequest } from '@/hooks/useCreateFeedRequest';
import { FeedFormController } from '../../CreateFeed/type';

interface useImageDeleteProps {
  images: Blob[];
  setImages: React.Dispatch<React.SetStateAction<Blob[]>>;
  setValue: UseFormSetValue<FeedFormController>;
  urlBucket: string[];
  setUrlBucket: React.Dispatch<React.SetStateAction<string[]>>;
}

function useImageDelete({
  images,
  setImages,
  setValue,
  urlBucket,
  setUrlBucket,
}: useImageDeleteProps) {
  const { deleteImage } = useCreateFeedRequest();
  const handleDeleteImage = (index: number) => {
    const filteredImages = images.filter((_, i) => i !== index);
    const filteredUrlBucket = urlBucket.filter((_, i) => i !== index);

    setImages(filteredImages);
    setValue('feedImage', filteredUrlBucket);
    setUrlBucket(filteredUrlBucket);
    deleteImage(urlBucket[index]);
  };
  return {
    handleDeleteImage,
  };
}

export default useImageDelete;
