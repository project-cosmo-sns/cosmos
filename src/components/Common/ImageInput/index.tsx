import styles from './ImageInput.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import RenderImageLabel from './RenderImageLabel';
import Input from '../Input';
import { UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';
import { AuthFormProps } from '@/@types/type';

const cn = classNames.bind(styles);

interface ImageInputProps {
  type?: string;
  watch?: UseFormWatch<AuthFormProps> | undefined;
  register?: UseFormRegisterReturn;
  initialImageUrl?: string | null;
}

/**
 * ImageInput component
 * @param {string} type - feed or profile or certify
 * @param {UseFormWatch<AuthFormProps> | undefined} watch - react-hook-form의 watch
 * @param {UseFormRegisterReturn} register - react-hook-form의 register
 * feed 타입은 이미지 추가 아이콘이 작게 나오도록 설정했습니다.
 * certify 타입은 이미지 추가 아이콘이 크게 나오도록 설정했습니다.
 * profile 타입은 profile 아이콘이 크게 나오고, 카메라 아이콘이 나오도록 설정했습니다.
 * 다른 곳에서 react-hook-form을 사용할 때, imageInput사용하려면 watch와 register를 넣어주어야 합니다.
 * authForm에서 사용 예시
 */

export default function ImageInput({
  type,
  watch,
  register,
  initialImageUrl,
}: ImageInputProps) {
  const [imageFile, setImageFile] = useState<string | null>(null);
  const feedImage = type === 'feed';
  const profileImage = type === 'profile';

  const uploadedImage = watch?.('image');

  useEffect(() => {
    if (initialImageUrl) {
      setImageFile(initialImageUrl);
    }

    let url: string | null = null;

    if (uploadedImage && uploadedImage.length > 0) {
      const file: Blob | MediaSource = new Blob([uploadedImage[0]]);
      setImageFile(URL.createObjectURL(file));
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [uploadedImage, initialImageUrl]);

  return (
    <div className={cn('image-container', { feedImage, profileImage })}>
      <label className={cn('image-label')} htmlFor="image">
        <RenderImageLabel imageFile={imageFile} type={type} />
      </label>
      <Input
        className={cn('image-input')}
        id="image"
        accept="image/*"
        type="file"
        register={register}
      />
    </div>
  );
}
