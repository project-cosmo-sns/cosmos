import { useEffect, useState } from 'react';

function useImagePreview(images: Blob[]) {
  // 이미지 미리보기 object url 상태
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    // 이미지 미리보기 함수
    const updatePreview = () => {
      if (images && images.length > 0) {
        const urlList = [];
        for (let i = 0; i < images.length; i += 1) {
          const file: Blob | MediaSource = new Blob([images[i]]);
          const createdUrl = URL.createObjectURL(file);
          urlList.push(createdUrl);
        }
        setImagePreview(urlList);
      } else {
        // x 버튼을 클릭하여 이미지 모두 삭제 시, 빈 배열 처리 -> 화면에 이미지 모두 사라짐
        setImagePreview([]);
      }
    };
    updatePreview();

    return () => {
      // 컴포넌트 언마운트 시, URL 객체 해제
      if (imagePreview.length > 0) {
        imagePreview.forEach((url) => {
          URL.revokeObjectURL(url);
        });
      }
      // 이미지 미리보기 상태 초기화
      setImagePreview([]);
    };
  }, [images, imagePreview]);
  return { imagePreview };
}

export default useImagePreview;
