import classNames from 'classnames/bind';
import styles from './FeedCard.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const cn = classNames.bind(styles);

interface FeedCardImageType {
  forDetails?: boolean;
  imageUrls: string[];
}

export default function FeedCardImage({
  forDetails,
  imageUrls,
}: FeedCardImageType) {
  return (
    <>
      {forDetails ||
        (!!imageUrls?.length && (
          <div className={cn('upload-image-wrapper')}>
            <div className={cn('upload-image')}>
              <Image
                className={cn('image-tag')}
                sizes="33vw"
                fill
                style={{ objectFit: 'cover' }}
                src={`${imageUrls[0]}`}
                alt="feedImage"
              />
            </div>
            {imageUrls.length > 1 && (
              <span className={cn('extra-stuff')}>
                + {imageUrls.length - 1}
              </span>
            )}
          </div>
        ))}
    </>
  );
}
