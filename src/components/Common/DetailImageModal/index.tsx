import styles from './DetailImageModal.module.scss';
import Modal from '../Layout/Modal';
import classNames from 'classnames/bind';

interface DetailImageModalProps {
  currentImageUrl: string;
  isImageModalVisible: boolean;
  hideImageDetail: () => void;
}

const cn = classNames.bind(styles);

export default function DetailImageModal({
  currentImageUrl,
  isImageModalVisible,
  hideImageDetail,
}: DetailImageModalProps) {
  return (
    <Modal
      modalVisible={isImageModalVisible}
      cssComponentDisplay={cn('modal-container')}
      cssModalSize={cn('modal-wrapper')}
      toggleModal={hideImageDetail}
    >
      <img
        src={currentImageUrl}
        alt="detail"
        style={{
          objectFit: 'contain',
          width: '800px',
          maxHeight: '70vh',
          maxWidth: '80vw',
        }}
      />
    </Modal>
  );
}
