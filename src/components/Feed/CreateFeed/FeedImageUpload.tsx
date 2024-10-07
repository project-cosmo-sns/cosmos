import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './CreateFeed.module.scss';
import { Controller } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import pLimit from 'p-limit';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCreateFeedRequest } from '@/hooks/useCreateFeedRequest';
import { AddImageIcon, CloseIcon } from '@/components/Common/IconCollection';
import { FeedImageUploadTypes } from './type';

const cn = classNames.bind(styles);

export default function FeedImageUpload({
  control,
  getValues,
  setValue,
}: FeedImageUploadTypes) {
  const [images, setImages] = useState<Blob[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [urlBucket, setUrlBucket] = useState<string[]>([]);
  const { getUrl, deleteImage } = useCreateFeedRequest();
  const { showToastHandler } = useToast();

  const putUrlMutate = useMutation({
    mutationFn: ({ url, file }: { url: string; file: Blob }) =>
      axios({
        method: 'put',
        url: `${url}`,
        data: file,
        headers: {
          'Access-Control-Allow-Origin': 'https://alpha.cosmo-sns.com',
        },
      }),
    onError: () => {
      console.error('에러');
    },
  });

  const putUrl = (url: string, file: Blob) => {
    putUrlMutate.mutate({ url, file });
  };

  const getUrlRequest = async () => {
    const { data } = await getUrl();
    const uploadUrl = String(data?.uploadURL);
    return uploadUrl;
  };

  // 이미지 업로드 함수
  const uploadFile = async (fileList: Blob[]) => {
    const currentImageValue = [...images, ...fileList];
    setImages(currentImageValue);
    const limit = pLimit(1);

    // 서버로 url 발급요청
    const urlPromises = fileList.map(() => limit(() => getUrlRequest()));

    const urlList: string[] = await Promise.all(urlPromises);

    // s3 서버로 이미지 등록 요청
    const uploadedUrlPromises = urlList.map((url, i) =>
      limit(() => putUrl(url, fileList[i])).then(() => url),
    );

    Promise.all(uploadedUrlPromises).then((uploadedUrlList) => {
      const splitedUrlList = uploadedUrlList.map(
        (uploadedUrl) => uploadedUrl.split('?')[0],
      );

      const prevFeedImage = getValues('feedImage');
      if (prevFeedImage) {
        setValue('feedImage', [...prevFeedImage, ...splitedUrlList]);
      } else {
        setValue('feedImage', splitedUrlList);
      }
      setUrlBucket((prev) => [...prev, ...splitedUrlList]);
    });
  };

  // 이미지 삭제 함수
  const filterImage = (index: number) => {
    const filteredImages = images.filter((_, i) => i !== index);
    const filteredUrlBucket = urlBucket.filter((_, i) => i !== index);

    setImages(filteredImages);
    setValue('feedImage', filteredUrlBucket);

    deleteImage(urlBucket[index]);
    setUrlBucket(filteredUrlBucket);
  };

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

  useEffect(() => {
    updatePreview();
  }, [images]);

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
              onChange={(event) => {
                const prevImages = getValues('feedImage');
                const fileList = event.target.files
                  ? Array.from(event.target.files)
                  : [];
                if (fileList.length + prevImages.length <= 3) {
                  uploadFile(fileList);
                } else {
                  showToastHandler('3개까지 업로드 가능합니다', 'warn');
                }
                event.target.value = '';
              }}
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
        {imagePreview && (
          <div className={cn('preview-box')}>
            {imagePreview.map((item, index) => (
              <div key={index} className={cn('preview-container')}>
                <CloseIcon
                  className={cn('close')}
                  onClick={() => {
                    filterImage(index);
                  }}
                />
                <div className={cn('preview-wrapper')}>
                  <Image
                    fill
                    className={cn('file-preview')}
                    src={item}
                    alt="image_item"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
