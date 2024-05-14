import { useState } from 'react';

export function useImageDetail() {
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const showImageDetail = (imageUrl: string) => {
    setIsImageModalVisible(true);
    setCurrentImageUrl(imageUrl);
  };

  const hideImageDetail = () => {
    setIsImageModalVisible(false);
    setCurrentImageUrl('');
  };

  return {
    currentImageUrl,
    isImageModalVisible,
    showImageDetail,
    hideImageDetail,
  };
}
