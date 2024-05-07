import Modal from '@/components/Common/Layout/Modal';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import classNames from 'classnames/bind';
import styles from './ProfileEditModal.module.scss';
import { MemberDataType } from '@/pages/profile/types';
import GenerationBadge from '@/components/Common/GenerationBadge';
import ImageInput from '@/components/Common/ImageInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import GetProfileImageUrl from './getImageUploadUrl';
import fetchData from '@/api/fetchData';
import { AuthFormProps } from '@/@types/type';
import { uploadImageToS3 } from './uploadImageToS3';

interface ProfileEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberData: MemberDataType;
}

interface FileWithUploadURL extends File {
  uploadURL?: string; // uploadURL 속성을 선택적(optional)으로 추가
}

const cn = classNames.bind(styles);

export default function ProfileEditModal({
  isOpen,
  setIsOpen,
  memberData,
}: ProfileEditModalProps) {
  const [previewImage, setPreviewImage] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { register, handleSubmit, watch, setValue } = useForm<AuthFormProps>();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImageUrl = await uploadImageToS3(file);
      console.log('Uploaded image URL:', uploadedImageUrl);

      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl); // 이미지 URL 상태 업데이트
        // setValue('image', uploadedImageUrl);
        setPreviewImage(uploadedImageUrl); // 실제 업로드 URL로 미리보기 업데이트
        console.log(uploadedImageUrl);
      }
    } catch (error) {
      console.error('이미지 업로드 에러 :', error);
      setPreviewImage(''); // 에러 시 미리보기 초기화
    }
  };

  const handleIntroduceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(e.target.value);
  };

  const handleProfileSubmit = async (ImageUrl: string) => {
    try {
      const response = await fetchData({
        param: '/profile/mine',
        method: 'patch',
        requestData: {
          nickname: memberData.nickname,
          introduce,
          profileImageUrl: ImageUrl,
        },
      });

      console.log('프로필 업데이트 성공:', response);
      setIsOpen(false); // 프로필 업데이트 후 모달 닫기

      if (!response) {
        console.error('네트워크 응답 오류');
      }
    } catch (error) {
      console.error('프로필 업데이트 에러:', error);
    }
  };

  useEffect(() => {
    if (memberData && memberData.profileImageUrl) {
      setPreviewImage(memberData.profileImageUrl);
    }
  }, [imageUrl]);

  const onSubmit: SubmitHandler<AuthFormProps> = async (data) => {
    // 폼 데이터를 사용하여 프로필 업데이트 로직 구현
    // data.image 는 업로드 이미지 URL로 사용
    await handleProfileSubmit(data.image);
  };
  return (
    <div>
      {isOpen && (
        <Modal
          modalVisible={isOpen}
          toggleModal={setIsOpen}
          title="프로필 수정"
          cssComponentDisplay={cn('profile-edit-modal')}
          cssModalSize={cn('380px')}
        >
          <form
            className={cn('profile-edit-Form')}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={cn('profile-image-edit')}>
              <ImageInput
                type="profile"
                watch={watch}
                register={{
                  ...register('image', { onChange: handleImageChange }),
                }}
                initialImageUrl={previewImage}
              />
            </div>
            <div className={cn('name')}>{memberData?.nickname}</div>
            <GenerationBadge
              generationInfo={memberData?.generation}
              isAuthorized={memberData?.isAuthorized}
            />
            <div className={cn('introduce')}>
              한줄소개
              {memberData?.introduce ? (
                <textarea
                  defaultValue={memberData.introduce}
                  autoComplete="on"
                  className={cn('textarea', {
                    textareaActive: memberData?.introduce,
                  })}
                  onChange={handleIntroduceChange}
                />
              ) : (
                <textarea placeholder="한줄소개를 입력하세요 (?자제한)" />
              )}
            </div>
            <div className={cn('flex-grow-div')}> </div>
            <div className={cn('edit-button')}>
              <DefaultButton
                // onClick={() => {
                //   handleProfileSubmit(imageUrl);
                // }}
                buttonType="submit"
                size="modal"
                color="$primary-01"
              >
                수정하기
              </DefaultButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
