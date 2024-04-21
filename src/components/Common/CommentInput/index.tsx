import DefaultButton from '../Buttons/DefaultButton';
import styles from './CommentInput.module.scss';
import classNames from 'classnames/bind';

interface CommentInputTypes {
  placeholder: string;
  handleClick: () => void;
}

const cn = classNames.bind(styles);

export default function CommentInput({
  placeholder,
  handleClick,
}: CommentInputTypes) {
  return (
    <div className={cn('wrapper')}>
      <input
        className={cn('comment-input')}
        type="text"
        name="commentInput"
        placeholder={placeholder}
      />
      <DefaultButton onClick={handleClick} size="small" color="purple">
        등록
      </DefaultButton>
    </div>
  );
}
