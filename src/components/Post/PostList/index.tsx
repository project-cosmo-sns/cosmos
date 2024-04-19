import { CategoryType } from '@/@types/type';
import { mockData } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useState } from 'react';
import CategoryList from '../CategoryList';
import PostPreview from '../PostPreview';
import styles from './PostList.module.scss';

interface PostListProps {
  selectedSort: 'all' | 'followed' | 'myGeneration';
}

export default function PostList({ selectedSort }: PostListProps) {
  const cn = classNames.bind(styles);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('공지사항');

  return (
    <div className={cn('wrapper')}>
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {mockData.map((postData) => (
        <PostPreview key={postData.id} postData={postData} />
      ))}
    </div>
  );
}
