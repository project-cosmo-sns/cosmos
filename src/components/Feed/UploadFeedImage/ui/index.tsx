import { useState } from 'react';
import classNames from 'classnames/bind';
import { Controller } from 'react-hook-form';

import { useToast } from '@/hooks/useToast';
import { AddImageIcon } from '@/components/Common/IconCollection';
import styles from '@/components/Feed/CreateFeed/CreateFeed.module.scss';
import { FeedImageUploadTypes } from '../../CreateFeed/type';
import ImagePreview from './imagePreview';
import useImagePreview from '../model/useImagePreview';
import useFeedImageUpload from '../model/useFeedImageUpload';
import useImageDelete from '../model/useImageDelete';

const cn = classNames.bind(styles);

export default function FeedImageUpload({
  control,
  getValues,
  setValue,
}: FeedImageUploadTypes) {
  // 이미지 파일 상태
  const [images, setImages] = useState<Blob[]>([]);
  // s3 url 상태
  const [urlBucket, setUrlBucket] = useState<string[]>([]);
  const { showToastHandler } = useToast();

  // 이미지 미리보기
  const { imagePreview } = useImagePreview(images);

  // 파일 업로드
  const { uploadFile } = useFeedImageUpload({
    images,
    setImages,
    getValues,
    setValue,
    setUrlBucket,
  });

  // 이미지 삭제 함수
  const { handleDeleteImage } = useImageDelete({
    images,
    setImages,
    setValue,
    urlBucket,
    setUrlBucket,
  });

  // 이미지 업로드 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const prevImages = getValues('feedImage');
    const fileList = e.target.files ? Array.from(e.target.files) : [];
    if (fileList.length + prevImages.length <= 3) {
      uploadFile(fileList);
    } else {
      showToastHandler('3개까지 업로드 가능합니다', 'warn');
    }
    e.target.value = '';
  };

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
