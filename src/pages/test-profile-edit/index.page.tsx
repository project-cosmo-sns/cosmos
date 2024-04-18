import styles from './ProfileEdit.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import ClassBadge from '@/components/Common/ClassBadge';

const cn = classNames.bind(styles);

export default function ProfileEdit() {
  return (
    <div>
      <Image src="/icon/X.svg" width={18} height={18} alt="닫는 아이콘" />{' '}
      프로필 수정{' '}
      <Image
        src="/icon/profile.svg"
        width={86}
        height={86}
        alt="프로필 아이콘"
      />{' '}
      <Image
        src="/icon/camera.svg"
        width={28}
        height={28}
        alt="카메라 아이콘"
      />
      이름
      <ClassBadge />
      한줄소개
      <textarea>한줄소개를 입력하세요(?자제한)</textarea>{' '}
      <div className={cn('edit-button')}>
        <DefaultButton
          onClick={() => {
            console.log('수정하기클릭');
          }}
          size="modal"
          color="$primary-01"
        >
          수정하기
        </DefaultButton>
      </div>
    </div>
  );
}
