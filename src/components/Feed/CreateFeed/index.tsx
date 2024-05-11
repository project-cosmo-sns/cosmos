import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import styels from './CreateFeed.module.scss';
import classNames from 'classnames/bind';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { CloseIcon, ProfileIcon } from '@/components/Common/IconCollection';
import { useState } from 'react';
import { postFeed } from './api';
import { FeedType } from './type';

interface CreatedFeedTypes {
  profileImage?: string;
}

interface Inputs {
  content: string;
  // feedImage: File[];
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

  /**
   * 제어컴포넌트인 이미지 업로드 input이 onChange 이벤가 일어나면 setImages 세터함수가 실행되어
   * 컴포넌트가 재랜더링 됩니다. 아래 반환문의 조건부 렌더링이 실행되면서 업로드한 이미지들의 url을 생성해 이미지 프리뷰를
   * 보여주게 됩니다
   */
  const updateImageUrls = () => {
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

  const onSubmit = async (data: FeedType) => {
    try {
      await postFeed(data);
    } catch (error) {
      console.log(error, '------error------');
    }
  };

  const imagePreview = updateImageUrls();
  /**
   * CloseIcon을 클릭하면 filterImage 함수가 실행됩니다.
   * @param {number} index - useState images 배열의 index는 이미지를 업로드할때 등록되는 index와 같습니다. useState images 배열을 순회하면서 클릭한 이미지의 index를 제외한 나머지 요소를 반환합니다.
   */
  // const filterImage = (index: number) => {
  //   const filteredImages = images.filter((el, i) => i !== index);
  //   setImages(filteredImages);
  //   setValue('feedImage', filteredImages);
  // };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('wrapper')}>
        <Image
          className={cn('profile-image')}
          src={profileImage || '/images/profile.svg'}
          alt="profile_image"
          width={40}
          height={40}
          onClick={() => console.log('프로필모달 열기')}
        />
        <div className={cn('content')}>
          <textarea
            className={cn('text')}
            rows={5}
            maxLength={300}
            placeholder="글을 작성해보세요"
            {...register('content', {
              required: '게시글을 작성해주세요',
            })}
          />
          {errors.content && (
            <span className={cn('error')}>{errors.content.message}</span>
          )}
          <span className={cn('limit')}>
            {watch('content') && watch('content').length}/300
          </span>
          <div className={cn('addImage')}>
            <div className={cn('image-wrapper')}>
              {/* <Controller
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
                      setValue('feedImage', currentImageValue);
                      setImages(currentIm ageValue);
                    }}
                  />
                )}
              /> */}
              <label htmlFor="feedImage" className={cn('file-label')}>
                <span className={cn('label-text')}>이미지 업로드</span>
              </label>
              {imagePreview &&
                imagePreview.map((item, index) => (
                  <div key={index} className={cn('preview-container')}>
                    {/* <CloseIcon
                      className={cn('close')}
                      onClick={() => {
                        filterImage(index);
                      }}
                    /> */}
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
