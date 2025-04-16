import classNames from 'classnames/bind';
import { Controller } from 'react-hook-form';

import { AddImageIcon } from '@/components/Common/IconCollection';
import styles from '@/components/Feed/CreateFeed/CreateFeed.module.scss';
import { FeedImageInputTypes } from '../type';
import ImagePreview from './FeedImagePreview';

const cn = classNames.bind(styles);

export default function FeedImageInput({
  FeedImageInputProps,
}: FeedImageInputTypes) {
  const { images, control, handleChange, imagePreview, handleDeleteImage } =
    FeedImageInputProps;
  return (
    <div className={cn('addImage')}>
      <div className={cn('image-wrapper')}>
        <Controller
          control={control}
          name="feedImage"
          render={() => (
            <input
              className={cn('file-input')}
              id="feedImage"
              type="file"
              accept=".jpg, .png, .webp, .jpeg"
              multiple
              onChange={handleChange}
            />
          )}
        />
        {images.length < 3 ? (
          <label htmlFor="feedImage" className={cn('file-label')}>
            <div className={cn('image-icon-wrapper')}>
              <AddImageIcon className={cn('image-icon')} />
              <span className={cn('label-text')}>이미지 업로드</span>
            </div>
          </label>
        ) : (
          ''
        )}
        <ImagePreview
          imagePreview={imagePreview}
          handleDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}
