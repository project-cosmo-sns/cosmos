import useOutSideClick from '@/hooks/useOutSideClick';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './EditDeleteMenu.module.scss';

interface EditDeleteMenuProps {
  isShow: boolean;
  handleCloseMenu: () => void;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
}

const cn = classNames.bind(styles);

export default function EditDeleteMenu({
  isShow,
  handleCloseMenu,
  handleClickEdit,
  handleClickDelete,
}: EditDeleteMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  useOutSideClick<HTMLUListElement>({
    ref: menuRef,
    callback: () => {
      handleCloseMenu();
    },
  });

  return (
    isShow && (
      <ul className={cn('container')} ref={menuRef}>
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
