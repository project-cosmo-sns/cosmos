import { SortType } from '@/constants/sortType';
import classNames from 'classnames/bind';
import { useState } from 'react';
import CategoryList from '../CategoryList';
import PostPreview from '../PostPreview';
import { PostListType } from '../types';
import styles from './PostList.module.scss';

interface PostListProps {
  selectedSort: SortType;
  postList: PostListType;
}

export default function PostList({ selectedSort, postList }: PostListProps) {
  const cn = classNames.bind(styles);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  return (
    <div className={cn('wrapper')}>
      <div className={cn('category-container')}>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className={cn('post-container')}>
        {postList.data.length ? (
          postList.data.map((postData) => (
            <PostPreview
              key={postData.postListInfo.post.id}
              postData={postData}
            />
          ))
        ) : (
          <div className={cn('no-post')}>포스트가 없습니다</div>
        )}
      </div>
    </div>
  );
}
