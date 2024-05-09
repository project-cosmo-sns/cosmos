import classNames from 'classnames/bind';
import PostPreview from '../PostPreview';
import { PostListType } from '../types';
import styles from './PostListContent.module.scss';

const cn = classNames.bind(styles);

interface PostListContentProps {
  postDataList: PostListType;
}

export default function PostListContent({
  postDataList,
}: PostListContentProps) {
  return (
    <div className={cn('post-container')}>
      {postDataList.data.length ? (
        postDataList.data.map((post) => (
          <PostPreview
            key={post.postListInfo.post.id}
            postData={post.postListInfo}
          />
        ))
      ) : (
        <div className={cn('no-post')}>포스트가 없습니다</div>
      )}
    </div>
  );
}
