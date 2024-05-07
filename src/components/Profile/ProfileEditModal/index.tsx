import Modal from '@/components/Common/Layout/Modal';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import classNames from 'classnames/bind';
import styles from './ProfileEditModal.module.scss';
import { MemberDataType } from '@/pages/profile/types';
import GenerationBadge from '@/components/Common/GenerationBadge';
import ImageInput from '@/components/Common/ImageInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import GetProfileImageUrl from './getProfileImageUrl';
import fetchData from '@/api/fetchData';
import { AuthFormProps } from '@/@types/type';

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

  const uploadImageAndGetUrl = async (
    file: FileWithUploadURL,
  ): Promise<string> => {
    try {
      const imageUrlResponse = await GetProfileImageUrl(file);
      return imageUrlResponse.uploadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      return '';
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue('image', imageUrl);

    try {
      const uploadImageUrl = await uploadImageAndGetUrl(file);
      console.log('Uploaded image URL:', imageUrl);
      setImageUrl(uploadImageUrl); // 이미지 URL 상태 업데이트
      setPreviewImage(URL.createObjectURL(file)); // 미리보기 이미지 설정
    } catch (error) {
      console.error('Image upload error:', error);
    }
    // reader.readAsDataURL(file);
  };

  const handleIntroduceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(e.target.value);
  };

  const handleProfileSubmit = async () => {
    try {
      const response = await fetchData({
        param: '/profile/mine',
        method: 'patch',
        requestData: {
          nickname: memberData.nickname,
          introduce,
          profileImageUrl: imageUrl,
        },
      });

      if (!response) {
        console.error('네트워크 응답 오류');
        return;
      }

      console.log('프로필 업데이트 성공:', response);
      setIsOpen(false); // 프로필 업데이트 후 모달 닫기
    } catch (error) {
      console.error('프로필 업데이트 에러:', error);
    }
  };

  useEffect(() => {
    if (memberData && memberData.profileImageUrl) {
      setPreviewImage(memberData.profileImageUrl);
    }
  }, [memberData]);

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
            onSubmit={handleSubmit(() =>
              handleProfileSubmit(introduce, imageUrl),
            )}
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
                onClick={() => {
                  handleProfileSubmit(introduce, imageUrl);
                }}
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
