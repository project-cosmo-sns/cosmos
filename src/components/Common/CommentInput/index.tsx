import styles from './CommentInput.module.scss';
import classNames from 'classnames/bind';

interface CommentInputTypes {
  placeholder: string;
}

const cn = classNames.bind(styles);

export default function CommentInput({ placeholder }: CommentInputTypes) {
  return (
    <input
      className={cn('comment-input')}
      type="text"
      name="commentInput"
      placeholder={placeholder}
    />
  );
}
