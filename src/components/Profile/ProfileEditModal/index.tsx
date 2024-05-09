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
import router from 'next/router';

interface ProfileEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberData: MemberDataType;
}

export interface ProfileEditProps extends AuthFormProps {
  introduce: string;
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
  const [upLoadComplete, setUploadComplete] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<MemberDataType | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<AuthFormProps>();

  // 기본값 설정하기
  useEffect(() => {
    if (memberData) {
      if (memberData.profileImageUrl) {
        setPreviewImage(memberData.profileImageUrl);
      }
      // 기존 introduce 값으로 상태 초기화
      setIntroduce(memberData.introduce || '');
      // 'react-hook-form'에서도 기존 값을 설정
      setValue('introduce', memberData.introduce || '');
    }
  }, [memberData.introduce, setValue]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // // 임시 미리보기 URL 생성
    const tempPreviewUrl = URL.createObjectURL(file);
    setPreviewImage(tempPreviewUrl);

    try {
      const response = await uploadImageToS3(file);
      console.log('Uploaded image URL:', response);

      // setImageUrl(uploadedImageUrl); // 이미지 URL 상태 업데이트
      // setValue('image', uploadedImageUrl);
      // setPreviewImage(uploadedImageUrl); // 실제 업로드 URL로 미리보기 업데이트
      console.log(uploadedImageUrl);
      setUploadedImageUrl(response);
      // setUploadComplete(true); // 얘떠ㅐ문임
    } catch (error) {
      console.error('이미지 업로드 에러 :', error);
      // setPreviewImage(tempPreviewUrl);
    }
  };

  useEffect(() => {
    if (upLoadComplete) {
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl); // 이미지 URL 상태 업데이트
        setValue('image', uploadedImageUrl);
        setPreviewImage(uploadedImageUrl); // 실제 업로드 URL로 미리보기 업데이트
      }
      console.log(uploadedImageUrl);
      setUploadComplete(false);
    }
  }, [upLoadComplete, uploadedImageUrl, setValue]);

  const handleIntroduceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value || '';
    setIntroduce(newValue);
    setValue('introduce', newValue);
  };

  const refetchProfile = async () => {
    try {
      const fetchedProfileData = await fetchData<MemberDataType>({
        param: '/profile/mine',
        method: 'get',
      });
      setProfileData(fetchedProfileData); // 상태 업데이트
      console.log('프로필 데이터 리패치 성공:', fetchedProfileData);
    } catch (error) {
      console.error('프로필 리패치 에러:', error);
    }
  };

  const handleProfileSubmit = async (
    profileImageUrl: string | null,
    newIntroduce: string,
  ) => {
    try {
      const requestData = {
        nickname: memberData.nickname,
        introduce: newIntroduce || memberData.introduce || '',
        profileImageUrl: profileImageUrl || memberData.profileImageUrl || null,
      };

      const response = await fetchData({
        param: '/profile/mine',
        method: 'patch',
        requestData,
      });

      console.log('프로필 업데이트 성공:', response);
      await refetchProfile();
      setIsOpen(false);
      router.reload();
    } catch (error) {
      console.error('프로필 업데이트 에러:', error);
    }
  };

  const onSubmit: SubmitHandler<AuthFormProps> = async (data) => {
    console.log('introduce:', introduce);
    await handleProfileSubmit(uploadedImageUrl, introduce);
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
                initialImageUrl={previewImage || uploadedImageUrl}
              />
              <button className={cn('image-delete-button')}>이미지 삭제</button>
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
                  {...register('introduce', {
                    onBlur: handleIntroduceChange,
                  })}
                  // value={introduce}
                  autoComplete="on"
                  className={cn('textarea', {
                    textareaActive: memberData?.introduce,
                  })}
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
