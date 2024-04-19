import Image from 'next/image';
import styels from './CreateFeed.module.scss';
import classNames from 'classnames/bind';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';

const cn = classNames.bind(styels);

export default function CreateFeed() {
  return (
    <div className={cn('create-feed-container')}>
      <div className={cn('create-feed-wrapper')}>
        <div className={cn('create-feed-user')}>
          <Image fill src="/images/profile.svg" alt="user-profile" />
        </div>
        <div className={cn('create-feed-content')}>
          <textarea
            className={cn('create-feed-text')}
            placeholder="글을 작성해보세요"
          />
          <div className={cn('create-feed-addImage')}>이미지 업로드 영역</div>
        </div>
      </div>
      <div className={cn('create-feed-button')}>
        <DefaultButton
          buttonType="submit"
          color="primary-01"
          onClick={() => console.log('피드 등록!')}
          size="medium"
        >
          등록
        </DefaultButton>
      </div>
    </div>
  );
}
