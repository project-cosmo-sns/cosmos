import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import CategoryList from '@/components/Post/CategoryList/index';
import PostPreview from '@/components/Post/PostPreview';
import {
  PostInfoType,
  PostListDataType,
  PostListType,
  PostType,
} from '@/components/Post/types';
import styles from '@/components/Post/PostList/PostList.module.scss';
import { SortType } from '@/constants/sortType';

interface PostListProps {
  postList: PostListType;
}

export default function MyPostList({
  // selectedSort,
  postList,
}: PostListProps) {
  const cn = classNames.bind(styles);
  // const currentUserId = memberData.memberId;

  const [selectedCategory, setSelectedCategory] = useState<string | '전체'>(
    '전체',
  );

  console.log('postList: ', postList);

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
              postData={postData.postListInfo}
            />
          ))
        ) : (
          <div className={cn('no-post')}>포스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
