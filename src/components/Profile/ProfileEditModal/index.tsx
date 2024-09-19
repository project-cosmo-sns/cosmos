import Modal from '@/components/Common/Layout/Modal';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import classNames from 'classnames/bind';
import styles from './ProfileEditModal.module.scss';
import { MemberDataType } from '@/pages/profile/types';
import GenerationBadge from '@/components/Common/GenerationBadge';
import ImageInput from '@/components/Common/ImageInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import fetchData from '@/api/fetchData';
import { AuthFormProps } from '@/@types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ProfileEditModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  memberData: MemberDataType;
  initialData: MemberDataType;
}

interface FetchDataResponse {
  uploadURL: string;
}

interface RequestDataProps {
  profileImageUrl: string;
  nickname: string;
  introduce: string | undefined;
}
const cn = classNames.bind(styles);

export default function ProfileEditModal({
  isOpen,
  setIsOpen,
  memberData,
}: ProfileEditModalProps) {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm<AuthFormProps>();
  const [previewImage, setPreviewImage] = useState(
    memberData.profileImageUrl || '',
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [profileImageUrl, setProfileImageUrl] = useState(
    memberData.profileImageUrl,
  );

  // 이 과정을 통해서는 이미지 url을 받는게 아니다.
  // 그냥 S3버킷에 업로드 가능한 pre-signed URL만 받고
  // 이걸 이용해서 이미지를 S3에 업로드하는것
  async function getPresignedUrl() {
    try {
      const response = (await fetchData({
        param: '/profile/image/create',
      })) as FetchDataResponse;

      const { uploadURL } = response;
      return uploadURL;
    } catch (error) {
      console.error('GetUploadUrl 에러: ', error);
      throw error;
    }
  }

  async function uploadFileToS3(file: File) {
    const uploadUrl = await getPresignedUrl();
    if (!uploadUrl) {
      console.error('업로드 URL GET 실패');
      return null;
    }
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file, // 업로드할 파일
        headers: {
          'Content-Type': file.type, // 파일 타입 지정
        },
      });
      if (response.ok) {
        return uploadUrl.split('?')[0]; // 업로드된 이미지의 S3 URL을 반환
      }
      console.error('Upload failed:', response);
      return null;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempPreviewUrl = URL.createObjectURL(file);
    setPreviewImage(tempPreviewUrl);

    try {
      const response = await uploadFileToS3(file); // S3에 파일 업로드
      setUploadedImageUrl(response);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  useEffect(() => {
    if (uploadedImageUrl) {
      setValue('image', uploadedImageUrl);
      setPreviewImage(uploadedImageUrl); // 실제 업로드 URL로 미리보기 업데이트
    }
  }, [setValue]);
  // uploadedImageUrl을 의존성 배열에 넣으니까 얘가 바뀔 때마다 업데이트돼서
  // 아직 비동기 작업하느라 uploadedImageUrl에 아무것도 없을 때 바로 업데이트 돼버림.
  // 그래서 미리보기 안뜨길래 뺐다.

  // ==================================================
  // 이미지 삭제 mutation으로 리팩토링
  const { mutate: deleteImage } = useMutation({
    mutationKey: ['profileData'],
    mutationFn: async () => {
      const imageUrlArray = memberData.profileImageUrl.split('/');
      const imageName = imageUrlArray[imageUrlArray.length - 1];

      const response = await axios.delete(
        `https://api-alpha.cosmo-sns.com/profile/image/delete?imageUrls[]=${encodeURIComponent(imageName)}`,
        {
          withCredentials: true,
          headers: { 'Cache-Control': 'no-cache' },
        },
      );
      return response.data;
    },
    onSuccess: (e) => {
      setProfileImageUrl('');
      setPreviewImage('');
      setValue('image', '');
    },
    onError: (error) => {
      console.error('이미지 삭제 에러 : ', error);
    },
  });

  // 프로필 업데이트
  const { mutate: updateProfile } = useMutation<
    RequestDataProps,
    Error,
    RequestDataProps
  >({
    mutationKey: ['memberData'],
    mutationFn: async (requestData: RequestDataProps) => {
      const response = await fetchData({
        param: '/profile/mine',
        method: 'patch',
        requestData, // 리퀘스트 데이터에 이전에 클릭한 프로필 값이 왜 들어가지?
      });
      return response;
    },
    onSuccess: (response: RequestDataProps) => {
      queryClient.invalidateQueries({
        queryKey: ['memberData'],
      });
      setIsOpen(false);
      router.reload();
    },
    onError: (error) => {
      console.error('프로필 업데이트 에러:', error);
    },
  });

  const handleIntroduceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value || '';
    setValue('introduce', newValue);
  };

  const onSubmit: SubmitHandler<AuthFormProps> = (data: AuthFormProps) => {
    const introduce = data.introduce || '';
    const requestData = {
      nickname: memberData.nickname,
      introduce,
      profileImageUrl: uploadedImageUrl || memberData.profileImageUrl, // requestData
    };
    updateProfile(requestData);
  };

  // 기본값 설정하기
  useEffect(() => {
    if (memberData.profileImageUrl) {
      setPreviewImage(memberData.profileImageUrl);
      // } else {
      //   setPreviewImage('');
    } // 'react-hook-form'에서도 기존 값을 설정
    setValue('introduce', memberData.introduce || '');
  }, [memberData, setValue, previewImage]);

  return (
    <Modal
      modalVisible={isOpen}
      toggleModal={setIsOpen}
      title="프로필 수정"
      cssComponentDisplay={cn('profile-edit-modal')}
      cssModalSize={cn('profile-edit-modalSize')}
      className="forFeed"
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
              ...register('image', {
                onChange: handleImageChange,
              }),
            }}
            initialImageUrl={previewImage}
          />
          <button
            className={cn('image-delete-button')}
            type="button"
            onClick={() => deleteImage()}
          >
            이미지 삭제
          </button>
        </div>
        <div className={cn('name')}>{memberData?.nickname}</div>
        <GenerationBadge
          generationInfo={memberData?.generation}
          authorizationStatus={memberData?.authorizationStatus}
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
            <textarea
              placeholder="한줄소개를 입력하세요 (?자제한)"
              {...register('introduce', {
                onBlur: handleIntroduceChange,
              })}
            />
          )}
        </div>
        <div className={cn('flex-grow-div')}> </div>
        <div className={cn('edit-button')}>
          <DefaultButton buttonType="submit" size="modal" color="$primary-01">
            수정하기
          </DefaultButton>
        </div>
      </form>
    </Modal>
  );
}
