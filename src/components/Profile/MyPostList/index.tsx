import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import CategoryList from '@/components/Post/CategoryList/index';
import PostPreview from '@/components/Post/PostPreview';
import { PostListDataType, PostListType } from '@/components/Post/types';
import styles from '@/components/Post/PostList/PostList.module.scss';
import { SortType } from '@/constants/sortType';
import { MemberDataType } from '@/pages/profile/types';

interface PostListProps {
  // selectedSort: SortType;
  postList: PostListDataType[];
  memberData: MemberDataType; // 현재 로그인한 사용자의 ID
}

export default function MyPostList({
  // selectedSort,
  postList,
  memberData,
}: PostListProps) {
  const cn = classNames.bind(styles);
  const currentUserId = memberData.memberId;

  const [selectedCategory, setSelectedCategory] = useState<string | '전체'>(
    '전체',
  );
  const [filteredPosts, setFilteredPosts] = useState<PostListDataType[]>([]);

  // 현재 로그인한 사용자가 작성한 포스트만 필터링
  useEffect(() => {
    // postList가 배열인지 확인 후 필터
    // memberData에 아직 memberId가 추가되지 않아 undefined가 뜸. 기다려봐야..!
    if (Array.isArray(postList)) {
      const myPosts = postList.filter(
        (postData) => postData.postListInfo.writer.id === currentUserId,
      );
      setFilteredPosts(myPosts);
    }
  }, [postList, currentUserId]);

  console.log('memberData : ', memberData);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('category-container')}>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className={cn('post-container')}>
        {filteredPosts.length ? (
          filteredPosts.map((postData) => (
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
