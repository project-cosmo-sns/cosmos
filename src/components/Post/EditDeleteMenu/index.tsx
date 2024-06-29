import classNames from 'classnames/bind';
import styles from './EditDeleteMenu.module.scss';

interface EditDeleteMenuProps {
  isShow: boolean;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
}

const cn = classNames.bind(styles);

export default function EditDeleteMenu({
  isShow,
  handleClickEdit,
  handleClickDelete,
}: EditDeleteMenuProps) {
  return (
    isShow && (
      <ul className={cn('container')}>
        <li className={cn('option')} onClick={handleClickEdit}>
          수정하기
        </li>
        <li className={cn('option')} onClick={handleClickDelete}>
          삭제하기
        </li>
      </ul>
    )
  );
}
