import Image from 'next/image';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { useCreateFeedRequest } from '@/hooks/useCreateFeedRequest';
import styles from './CreateFeed.module.scss';
import { FeedType, CreatedFeedTypes, FeedFormController } from './type';
import FeedTextArea from './FeedTextArea';
import FeedImageUpload from './FeedImageUpload';

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
  const { postFeed } = useCreateFeedRequest();

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
          <FeedImageUpload
            control={control}
            getValues={getValues}
            setValue={setValue}
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
