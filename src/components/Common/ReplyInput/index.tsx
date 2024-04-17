import styles from './ReplyInput.module.scss';
import classNames from 'classnames/bind';

interface ReplyInputTypes {
  placeholder: string;
}

const cn = classNames.bind(styles);

export default function ReplyInput({ placeholder }: ReplyInputTypes) {
  return (
    <input
      className={cn('home')}
      type="text"
      name="commentInput"
      placeholder={placeholder}
    />
  );
}
