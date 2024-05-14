import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import DefaultButton from '../Buttons/DefaultButton';
import TextArea from '../Input/Textarea';
import styles from './CommentInput.module.scss';

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
      <TextArea
        placeholder={placeholder}
        register={{
          ...register('comment', { required: true, maxLength: 300 }),
        }}
      />
      <DefaultButton
        disabled={isSubmitting}
        buttonType="submit"
        size="small"
        color="purple"
      >
        등록
      </DefaultButton>
    </form>
  );
}
