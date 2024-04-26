import Image from 'next/image';
import {
  useForm,
  SubmitHandler,
  Controller,
  UseFormSetValue,
} from 'react-hook-form';
import styels from './CreateFeed.module.scss';
import classNames from 'classnames/bind';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { CloseIcon, ProfileIcon } from '@/components/Common/IconCollection';
import { useState } from 'react';

interface CreatedFeedTypes {
  profileImage: string;
}

interface Inputs {
  feedContent: string;
  feedImage: File[];
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
    setValue,
    getValues,
    control,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [images, setImages] = useState<File[]>([]);

  const tempFnc = () => {
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

  const imagePreview = tempFnc();
  console.log(imagePreview, '-----imagePreview------');
  console.log(images, '-----images------');

  const filterImage = (index: number) => {
    const filteredImages = images.filter((el, i) => i !== index);
    setImages(filteredImages);
    setValue('feedImage', filteredImages);
  };

  return (
    <form
      className={cn('container')}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(getValues(), '-----데이터----');
      }}
    >
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
          <span className={cn('limit')}>
            {watch('feedContent') && watch('feedContent').length}/300
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
                      console.log(event.target.files, '-----타입-----');
                      setValue('feedImage', currentImageValue);
                      setImages(currentImageValue);
                    }}
                  />
                )}
              />
              <label htmlFor="feedImage" className={cn('file-label')}>
                <span className={cn('label-text')}>이미지 업로드</span>
              </label>
              {imagePreview &&
                imagePreview.map((item, index) => (
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
          </div>
        </div>
      </div>
      <div className={cn('button')}>
        <DefaultButton
          buttonType="submit"
          color="primary-01"
          onClick={() => console.log('')}
          size="medium"
        >
          등록
        </DefaultButton>
      </div>
    </form>
  );
}
