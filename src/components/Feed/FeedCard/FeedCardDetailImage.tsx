import classNames from 'classnames/bind';
import styles from './FeedCard.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const cn = classNames.bind(styles);

interface FeedCardDeatilImageType {
  forDetails?: boolean;
  imageUrls: string[];
  showImageDetail: (imageUrl: string) => void;
}

export default function FeedCardDeatilImage({
  forDetails,
  imageUrls,
  showImageDetail,
}: FeedCardDeatilImageType) {
  const [isImageLoading, setImageLoading] = useState<boolean[]>(
    Array(imageUrls.length).fill(true),
  );

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };
  return (
    <>
      {forDetails && !!imageUrls?.length && (
        <div className={cn('detail-upload-image-wrapper')}>
          {imageUrls.map((url: string, index) => (
            <div
              key={index}
              className={cn('detail-upload-image')}
              onClick={() => showImageDetail(url)}
            >
              <Image
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                fill
                onLoad={() => handleImageLoad(index)}
                className={cn('image-item', {
                  blur: isImageLoading[index],
                  'remove-blur': isImageLoading[index],
                })}
                style={{ objectFit: 'cover' }}
                src={url}
                sizes="33vw"
                priority
                alt="feedImage"
                loading="eager"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
