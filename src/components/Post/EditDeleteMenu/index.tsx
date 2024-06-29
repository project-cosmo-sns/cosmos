import classNames from 'classnames/bind';
import styles from './EditDeleteMenu.module.scss';

interface EditDeleteMenuProps {
  isShow: boolean;
}

const cn = classNames.bind(styles);

export default function EditDeleteMenu({ isShow }: EditDeleteMenuProps) {
  return (
    isShow && (
      <ul className={cn('container')}>
        <li className={cn('option')}>수정하기</li>
        <li className={cn('option')}>삭제하기</li>
      </ul>
    )
  );
}
