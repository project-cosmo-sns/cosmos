import { ModalPropsType } from '@/@types/type';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import ImageInput from '@/components/Common/ImageInput';
import Input from '@/components/Common/Input';
import Modal from '@/components/Common/Layout/Modal';
import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';

const cn = classNames.bind(styles);

export default function AuthForm({
  modalVisible,
  toggleModal,
}: ModalPropsType) {
  const submitClick = () => {
    console.log('제출완료!');
  };
  return (
    <Modal
      title="회원인증"
      modalVisible={modalVisible}
      toggleModal={toggleModal}
    >
      <form className={cn('authForm-container')}>
        <div className={cn('auth-generation')}>
          <h2>기수</h2>
          <Input placeholder="기수를 입력하세요. ex) 3" />
        </div>
        <div className={cn('auth-image')}>
          <h2>스프린터 인증</h2>
          <span>코드잇 프로필 페이지 또는 수료증을 업로드해 주세요</span>
          <ImageInput type="certify" />
        </div>
        <DefaultButton
          buttonType="button"
          size="modal"
          color="primary-01"
          onClick={submitClick}
        >
          제출
        </DefaultButton>
      </form>
    </Modal>
  );
}
