import styles from './CommentButton.module.scss';
import classNames from 'classnames/bind';

interface CommentButtonTypes {
  children: string;
  clickEvent: () => void;
}

const cn = classNames.bind(styles);

export default function CommentButton({
  children,
  clickEvent,
}: CommentButtonTypes) {
  return (
    <button
      className={cn('comment-button')}
      onClick={() => clickEvent()}
      type="submit"
    >
      {children}
    </button>
  );
}
