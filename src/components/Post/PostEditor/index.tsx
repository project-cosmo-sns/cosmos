import classNames from 'classnames/bind';
import styles from './PostEditor.module.scss';

export default function PostEditor() {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('wrapper')}>
      <input className={cn('input', 'title')} placeholder="제목을 입력하세요" />
      <textarea className={cn('editor')} placeholder="글을 작성해보세요" />
      <input
        className={cn('input', 'hashtag')}
        placeholder="#태그 입력 (최대 5개)"
      />
    </div>
  );
}
