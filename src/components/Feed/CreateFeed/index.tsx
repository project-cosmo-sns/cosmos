import Image from 'next/image';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { CloseIcon } from '@/components/Common/IconCollection';
import { useMutation } from '@tanstack/react-query';
import { useCreateFeedRequest } from '@/hooks/useCreateFeedRequest';
import styles from './CreateFeed.module.scss';
import { FeedType, CreatedFeedTypes, Inputs } from './type';

/**
 * CreatedFeed component
 * @param {string} profileImage - 로그인한 유저의 프로필 url을 받아 화면에 출력합니다.
 * @return {JSX.Element} 글작성 인풋과 이미지 추가하는 인풋을 포함하는 CreatedFeed 컴포넌트 입니다.
 */

export default function CreateFeed({
  profileImage,
  toggleModal,
  modalVisible,
}: CreatedFeedTypes) {
  const cn = classNames.bind(styles);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [images, setImages] = useState<Blob[]>([]);
  const [urlBucket, setUrlBucket] = useState<string[]>([]);
  const { getUrl, deleteImage, postFeed } = useCreateFeedRequest(toggleModal);

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
    onSuccess: (data) => {
      const prev = getValues('feedImage');
      if (data.config.url) {
        const imageUrl = data.config.url.split('?')[0];
        console.log(imageUrl, '-----성공 응답 url --------');
        if (prev) {
          setValue('feedImage', [...prev, imageUrl]);
          setUrlBucket([...prev, imageUrl]);
        } else {
          setValue('feedImage', [imageUrl]);
          setUrlBucket([imageUrl]);
        }
      }
    },
    onError: () => {
      console.log('에러');
    },
  });

  const putUrl = (url: string, file: Blob) => {
    putUrlMutate.mutate({ url, file });
  };

  const updateImageUrls = () => {
    if (images && images.length > 0) {
      let urlList = [];
      for (let i = 0; i < images.length; i += 1) {
        const file: Blob | MediaSource = new Blob([images[i]]);
        const createdUrl = URL.createObjectURL(file);
        urlList.push(createdUrl);
      }
      return [...urlList];
    }
    return [];
  };

  const getUrlRequest = async () => {
    const { data } = await getUrl();
    return data?.uploadURL;
  };

  const updateUrlBucket = async (currentImageValue: Blob[]) => {
    let urlList: string[] = [];
    if (currentImageValue && currentImageValue.length > 0) {
      for (let i = 0; i < currentImageValue.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const uploadUrl = await getUrlRequest();
        if (uploadUrl) urlList.push(uploadUrl);
      }
      urlList.map((url, i) => putUrl(url, currentImageValue[i]));
    }
    return [];
  };

  const onSubmit = async (data: FeedType) => {
    postFeed(data);
  };

  const imagePreview = updateImageUrls();

  const filterImage = (index: number) => {
    const urlBox = getValues('feedImage');
    const filteredImages = images.filter((el, i) => i !== index);
    const filteredUrlBucket = urlBox.filter((el, i) => i !== index);
    deleteImage(urlBucket[index]);
    setImages(filteredImages);
    setValue('feedImage', filteredUrlBucket);
    setUrlBucket(filteredUrlBucket);
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('wrapper')}>
        <Image
          className={cn('profile-image')}
          src={profileImage || '/images/profile.svg'}
          alt="profile_image"
          width={40}
          height={40}
          onClick={() => console.log('프로필모달 열기')}
        />
        <div className={cn('content')}>
          <textarea
            className={cn('text')}
            rows={5}
            maxLength={300}
            placeholder="글을 작성해보세요"
            {...register('content', {
              required: '게시글을 작성해주세요',
            })}
          />
          {errors.content && (
            <span className={cn('error')}>{errors.content.message}</span>
          )}
          <span className={cn('limit')}>
            {watch('content') && watch('content').length}/300
          </span>
          <div className={cn('addImage')}>
            <div className={cn('image-wrapper')}>
              <Controller
                control={control}
                name="feedImage"
                render={({ field: { onChange } }) => (
                  <input
                    className={cn('file-input')}
                    id="feedImage"
                    type="file"
                    multiple
                    onChange={(event) => {
                      const fileList = event.target.files
                        ? Array.from(event.target.files)
                        : [];
                      const currentImageValue = [...images, ...fileList];
                      console.log([...fileList], '-----파일리스트----');
                      setImages(currentImageValue);
                      updateUrlBucket(fileList);
                    }}
                  />
                )}
              />
              <label htmlFor="feedImage" className={cn('file-label')}>
                <span className={cn('label-text')}>이미지 업로드</span>
              </label>
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
                        <img
                          className={cn('file-preview')}
                          src={item}
                          alt="image_item"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={cn('button')}>
        <DefaultButton buttonType="submit" color="primary-01" size="large">
          등록
        </DefaultButton>
      </div>
    </form>
  );
}
