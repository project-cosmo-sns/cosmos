// 댓글 수정창 디자인 없어서 임시로 만들어둠. 추후 수정예정
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import styles from './EditComment.module.scss';

const cn = classNames.bind(styles);

// interface

export default function EditComment({ content }: { content: string }) {
  // const {} = useFrom()
  return (
    <div className={cn('wrapper')}>
      <textarea value={content} />
      <button type="button" className={cn('edit-button')}>
        수정
      </button>
    </div>
  );
}
