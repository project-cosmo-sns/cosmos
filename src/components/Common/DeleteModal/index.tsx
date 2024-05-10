import classNames from 'classnames/bind';
import Modal from '../Layout/Modal';
import styles from './DeleteModal.module.scss';

interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (args: boolean) => void;
  handleDelete: () => void;
  title?: string;
  deleteText?: string;
}

const cn = classNames.bind(styles);

export default function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleDelete,
  title = '삭제',
  deleteText = '삭제하기',
}: DeleteModalProps) {
  return (
    <Modal
      modalVisible={isDeleteModalOpen}
      toggleModal={() => setIsDeleteModalOpen(false)}
      cssModalSize={cn()}
      cssComponentDisplay={cn()}
    >
      <div className={cn('wrapper')}>
        <span>정말 {title} 하시겠습니까?</span>
        <div className={cn('button-container')}>
          <button
            className={cn('button', 'cancel')}
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            취소하기
          </button>
          <button
            className={cn('button', 'delete')}
            type="button"
            onClick={handleDelete}
          >
            {deleteText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
