import { useForm } from 'react-hook-form';
import DefaultButton from '../Buttons/DefaultButton';
import Input from '../Input';
import styles from './CommentInput.module.scss';
import classNames from 'classnames/bind';

export interface Comment {
  comment: string;
}

interface CommentInputTypes {
  placeholder: string;
  onSubmit: (data: Comment) => void;
}

const cn = classNames.bind(styles);

export default function CommentInput({
  placeholder,
  onSubmit,
}: CommentInputTypes) {
  const { register, handleSubmit } = useForm<Comment>();
  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder={placeholder}
        register={{ ...register('comment', { required: true }) }}
      />
      <DefaultButton
        onClick={() => console.log('등록버튼 클릭!')}
        buttonType="submit"
        size="small"
        color="purple"
      >
        등록
      </DefaultButton>
    </form>
  );
}
