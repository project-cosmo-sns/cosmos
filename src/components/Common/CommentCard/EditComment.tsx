// 댓글 수정창 디자인 없어서 임시로 만들어둠. 추후 수정예정
import classNames from 'classnames/bind';
import styles from './EditComment.module.scss';

const cn = classNames.bind(styles);

export default function EditComment({
  commentValue,
  setCommentValue,
}: {
  commentValue: string;
  setCommentValue: (args: string) => void;
}) {
  return (
    <div className={cn('wrapper')}>
      <textarea
        value={commentValue}
        onChange={(event) => setCommentValue(event.target.value)}
      />
      <button type="button" className={cn('edit-button')}>
        수정
      </button>
    </div>
  );
}
