import classNames from 'classnames/bind';
import styles from './PostWritePage.module.scss';
import PostEditor from '@/components/Post/PostEditor';

export default function PostWritePage() {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('wrapper')}>
      <h2>포스트 작성</h2>
      <PostEditor />
      {/* 추후 공통 버튼 컴포넌트로 변경 예정 */}
      <button className={cn('button')} type="submit">
        등록하기
      </button>
    </div>
  );
}
