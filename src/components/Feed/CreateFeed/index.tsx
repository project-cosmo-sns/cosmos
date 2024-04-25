import Image from 'next/image';
import styels from './CreateFeed.module.scss';
import classNames from 'classnames/bind';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import ImageInput from '@/components/Common/ImageInput';

const cn = classNames.bind(styels);

export default function CreateFeed() {
  return (
    <div className={cn('container')}>
      <div className={cn('wrapper')}>
        <div className={cn('user')}>
          <Image fill src="/images/profile.svg" alt="user-profile" />
        </div>
        <div className={cn('content')}>
          <textarea className={cn('text')} placeholder="글을 작성해보세요" />
          <div className={cn('addImage')}>
            <ImageInput type="feed" />
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
    </div>
  );
}
