import styles from './ImageInput.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';

/**
 * ImageInput component
 * @param {string} type - feed or profile
 * width 와 height를 100%로 설정하여 부모 요소에 맞게 이미지가 출력되도록 설정했습니다. .
 * feed 타입은 이미지 추가 아이콘이 작게 나오도록 설정했습니다. .
 */

const cn = classNames.bind(styles);

export default function ImageInput({ type }: { type?: string }) {
  const [imageFile, setImageFile] = useState<string | null>(null);
  const feedImage = type === 'feed';
  const profileImage = type === 'profile';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.onload = () => {
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={cn('image-container', { feedImage, profileImage })}>
      <label className={cn('image-label')} htmlFor="file">
        {/* {imageFile ? (
          <Image src={imageFile} layout="fill" alt="image" />
        ) : feedImage ? (
          <>
            <Image
              src="/images/addImage.svg"
              width={65}
              height={55}
              alt="addImage"
            />
            <span>이미지 추가</span>
          </>
        ) : (
          <Image src="/images/user.svg" width={65} height={65} alt="user" />
        )} */}
      </label>
      <input
        className={cn('image-input')}
        id="file"
        accept="image/*"
        type="file"
        onChange={handleImageChange}
      />
    </div>
  );
}
