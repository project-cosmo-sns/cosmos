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
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Comment>({
    defaultValues: {
      comment: '',
    },
  });

  return (
    <form className={cn('wrapper')} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder={placeholder}
        register={{ ...register('comment', { required: true }) }}
      />
      <DefaultButton
        disabled={isSubmitting}
        onClick={() => console.log('댓글 전송 클릭')}
        buttonType="submit"
        size="small"
        color="purple"
      >
        등록
      </DefaultButton>
    </form>
  );
}
