import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import CategoryList from '@/components/Post/CategoryList/index';
import PostPreview from '@/components/Post/PostPreview';
import { PostListDataType, PostListType } from '@/components/Post/types';
import styles from '@/components/Post/PostList/PostList.module.scss';
import { SortType } from '@/constants/sortType';

interface MyPostListProps {
  // selectedSort: SortType;
  postList: PostListDataType[];
}

export default function MyPostList({
  // selectedSort,
  postList,
}: MyPostListProps) {
  const cn = classNames.bind(styles);
  // const currentUserId = memberData.memberId;

  const [myPosts, setMyPosts] = useState<PostListDataType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | '전체'>(
    '전체',
  );

  useEffect(() => {
    if (Array.isArray(postList)) {
      setMyPosts(postList);
    }
  }, [postList]);

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
        {myPosts.length ? (
          myPosts.map((postData) => (
            <PostPreview
              key={postData.postListInfo.post.id}
              postData={postData}
            />
          ))
        ) : (
          <div className={cn('no-post')}>포스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
