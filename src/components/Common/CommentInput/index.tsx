import { useForm } from 'react-hook-form';
import DefaultButton from '../Buttons/DefaultButton';
import Input from '../Input';
import styles from './CommentInput.module.scss';
import classNames from 'classnames/bind';
import { postComment } from './api';

interface CommentInputTypes {
  placeholder: string;
  feedId: number;
}

interface Comment {
  comment: string;
}

const cn = classNames.bind(styles);

export default function CommentInput({
  placeholder,
  feedId,
}: CommentInputTypes) {
  const { register, handleSubmit } = useForm<Comment>();
  const onSubmit = (data) => {
    console.log(data);
    postComment(data, feedId);
  };
  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder={placeholder} register={{ ...register('comment') }} />
      <DefaultButton buttonType="submit" size="small" color="purple">
        등록
      </DefaultButton>
    </form>
  );
}
