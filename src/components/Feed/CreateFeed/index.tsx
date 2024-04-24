import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import styels from './CreateFeed.module.scss';
import classNames from 'classnames/bind';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import ImageInput from '@/components/Common/ImageInput';
import { ProfileIcon } from '@/components/Common/IconCollection';

interface CreatedFeedTypes {
  profileImage: string;
}

interface Inputs {
  feedContent: string;
  feedImage: string;
}

/**
 * CreatedFeed component
 * @param {string} profileImage - 로그인한 유저의 프로필 url을 받아 화면에 출력합니다.
 * @return {JSX.Element} 글작성 인풋과 이미지 추가하는 인풋을 포함하는 CreatedFeed 컴포넌트 입니다.
 */

export default function CreateFeed({ profileImage }: CreatedFeedTypes) {
  const cn = classNames.bind(styels);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(getValues('feedContent'));

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('wrapper')}>
        <div className={cn('user')}>
          {profileImage ? (
            <Image fill src={profileImage} alt="user-profile" />
          ) : (
            <ProfileIcon />
          )}
        </div>
        <div className={cn('content')}>
          <textarea
            className={cn('text')}
            rows={5}
            maxLength={300}
            placeholder="글을 작성해보세요"
            {...register('feedContent', {
              required: '게시글을 작성해주세요',
            })}
          />
          {errors.feedContent && (
            <span className={cn('error')}>{errors.feedContent.message}</span>
          )}
          <div className={cn('addImage')}>
            <ImageInput type="feed" {...register('feedImage')} />
          </div>
        </div>
      </div>
      <div className={cn('button')}>
        <DefaultButton
          buttonType="submit"
          color="primary-01"
          onClick={() => console.log('피드 등록!')}
          size="medium"
        >
          등록
        </DefaultButton>
      </div>
    </form>
  );
}
