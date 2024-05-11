import { ModalPropsType, AuthFormProps } from '@/@types/type';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import ImageInput from '@/components/Common/ImageInput';
import Input from '@/components/Common/Input';
import Modal from '@/components/Common/Layout/Modal';
import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { generationRegex } from '@/constants/generationRegex';
import { CheckIcon } from '@/components/Common/IconCollection';
import { useToast } from '@/hooks/useToast';
import { useSendAuthData, useDeleteAuthData } from '@/api/authorization';

const cn = classNames.bind(styles);

export default function AuthForm({
  modalVisible,
  toggleModal,
}: ModalPropsType) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormProps>();

  const router = useRouter();
  const { showToastHandler } = useToast();
  const sendAuth = useSendAuthData();
  const onSubmit: SubmitHandler<AuthFormProps> = (data) => {
    sendAuth(data);
    showToastHandler(
      '인증 신청이 완료되었습니다.',
      <CheckIcon fill="#0ACF83" />,
    );
    router.push('/?tab=feed');
    console.log(sendAuth(data));
  };

  return (
    <Modal
      title="스프린터 인증"
      modalVisible={modalVisible}
      toggleModal={toggleModal}
      cssModalSize={cn('auth-container')}
      cssComponentDisplay={cn('auth-wrapper')}
    >
      <form className={cn('auth-Form')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn('auth-generation')}>
          <h2>기수</h2>
          <Input
            id="generation"
            type="text"
            placeholder="기수를 입력하세요. ex) 3"
            register={register('generation', {
              required: '기수를 입력해 주세요.',
              pattern: {
                value: generationRegex,
                message: '숫자만 입력해 주세요.',
              },
            })}
          />
          {errors.generation && <small>{errors.generation.message}</small>}
        </div>
        <div className={cn('auth-image')}>
          <h2>스프린터 인증</h2>
          <span>코드잇 프로필 페이지 또는 수료증을 업로드해 주세요</span>
          <ImageInput
            type="certify"
            watch={watch}
            register={register('image')}
          />
        </div>
        <DefaultButton
          buttonType="button"
          size="modal"
          color="primary-01"
          onClick={handleSubmit(onSubmit)}
        >
          신청하기
        </DefaultButton>
      </form>
    </Modal>
  );
}
