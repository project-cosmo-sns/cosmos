import Image from 'next/image';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';

import { useToast } from '@/hooks/useToast';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { useCreateFeedRequest } from '@/hooks/useCreateFeedRequest';
import styles from './CreateFeed.module.scss';
import { FeedType, CreatedFeedTypes, FeedFormController } from './type';
import FeedTextArea from './ui/FeedTextArea';
import FeedImageInput from './ui/FeedImageInput';
import useImagePreview from './model/useImagePreview';
import useFeedImageUpload from './model/useFeedImageUpload';
import useImageDelete from './model/useFeedImageDelete';

/**
 * CreatedFeed component
 * @param {string} profileImage - 로그인한 유저의 프로필 url을 받아 화면에 출력합니다.
 * @return {JSX.Element} 글작성 인풋과 이미지 추가하는 인풋을 포함하는 CreatedFeed 컴포넌트 입니다.
 */

const cn = classNames.bind(styles);

export default function CreateFeed({ profileImage }: CreatedFeedTypes) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    watch,
  } = useForm<FeedFormController>({
    defaultValues: {
      content: '',
      feedImage: [],
    },
  });
  const { showToastHandler } = useToast();
  // 이미지 파일 상태
  const [images, setImages] = useState<Blob[]>([]);
  // s3 url 상태
  const [urlBucket, setUrlBucket] = useState<string[]>([]);

  // 이미지 미리보기
  const { imagePreview } = useImagePreview(images);

  // 피드 전송 요청
  const { postFeed } = useCreateFeedRequest();

  // 이미지 파일 업로드
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

  // 이미지 인풋 핸들러
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

  // 폼 제출 함수
  const onSubmit = async (data: FeedType) => {
    const sanitizedContent = DOMPurify.sanitize(data.content);
    const sanitizedData = {
      content: sanitizedContent,
      feedImage: data.feedImage,
    };
    postFeed(sanitizedData);
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
        />
        <div className={cn('content')}>
          <FeedTextArea errors={errors} register={register} watch={watch} />
          <FeedImageInput
            FeedImageInputProps={{
              images,
              control,
              handleChange,
              imagePreview,
              handleDeleteImage,
            }}
          />
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
