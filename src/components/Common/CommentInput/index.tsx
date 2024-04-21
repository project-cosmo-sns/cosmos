import DefaultButton from '../Buttons/DefaultButton';
import Input from '../Input';
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
      <Input placeholder={placeholder} />
      <DefaultButton onClick={handleClick} size="small" color="purple">
        등록
      </DefaultButton>
    </div>
  );
}
