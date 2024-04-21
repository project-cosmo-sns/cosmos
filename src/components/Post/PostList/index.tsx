import { mockData, CategoryType } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useState } from 'react';
import CategoryList from '../CategoryList';
import PostPreview from '../PostPreview';
import styles from './PostList.module.scss';

interface PostListProps {
  isMyProfile?: boolean;
  selectedSort: 'all' | 'followed' | 'myGeneration';
}

export default function PostList({
  isMyProfile = false,
  selectedSort,
}: PostListProps) {
  const cn = classNames.bind(styles);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('공지사항');

  return (
    <div className={cn('wrapper')}>
      <div className={cn('category-container')}>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className={cn('post-container')}>
        {mockData.map((postData) => (
          <PostPreview key={postData.id} postData={postData} />
        ))}
      </div>
    </div>
  );
}
