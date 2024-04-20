import React from 'react';
import { DeleteIcon, EditIcon } from '../../IconCollection';
import classNames from 'classnames/bind';
import styles from './ActionButtons.module.scss';

interface ActionButtonsProps {
  isButtonShow: boolean;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
}

const cn = classNames.bind(styles);

export default function ActionButtons({
  isButtonShow,
  handleClickEdit,
  handleClickDelete,
}: ActionButtonsProps) {
  return (
    isButtonShow && (
      <div className={cn('edit')}>
        <EditIcon width="18" height="18" onClick={handleClickEdit} />
        <DeleteIcon width="18" height="18" onClick={handleClickDelete} />
      </div>
    )
  );
}
