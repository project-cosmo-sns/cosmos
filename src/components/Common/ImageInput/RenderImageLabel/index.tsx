import Image from 'next/image';
import {
  AddImageIcon,
  ProfileIcon,
  CameraIcon,
} from '@/components/Common/IconCollection';
import styles from '../ImageInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type props = {
  imageFile: string | null;
  type: string | undefined;
};

export default function RenderImageLabel({ imageFile, type }: props) {
  if (imageFile) {
    return <Image src={imageFile} layout="fill" alt="image" />;
  }
  if (type === 'certify') {
    return (
      <>
        <AddImageIcon width="65" height="55" />
        <span>이미지 추가</span>
      </>
    );
  }
  if (type === 'feed') {
    return (
      <>
        <AddImageIcon width="18" height="18" />
        <span>이미지 추가</span>
      </>
    );
  }
  if (type === 'profile') {
    return (
      <>
        <ProfileIcon width="86" height="86" />
        <div className={cn('camera-container')}>
          <CameraIcon width="14" height="14" />
        </div>
      </>
    );
  }
}
