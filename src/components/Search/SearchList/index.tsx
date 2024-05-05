import { PostData, mockData } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useState } from 'react';
import PostPreview from '@/components/Post/PostPreview';
import styles from './PostList.module.scss';

interface PostListProps {
  isMyProfile?: boolean;
  selectedSort: 'all' | 'followed' | 'myGeneration';
}

export default function SearchListr({
  isMyProfile = false,
  selectedSort,
}: PostListProps) {
  const cn = classNames.bind(styles);
  const [selectedCategory, setSelectedCategory] = useState<string | '전체'>(
    '전체',
  );

  // 임시로 분류하는 함수 추가. 추후 정렬, 카테고리 옵션에 맞는 데이터 불러오는 요청으로 수정 예정
  const filterPosts = (
    postData: PostData[],
    sort: 'all' | 'followed' | 'myGeneration',
    category: string,
  ) => {
    let filteredPosts = postData;

    if (sort === 'followed') filteredPosts = [mockData[0], mockData[1]];
    if (sort === 'myGeneration') filteredPosts = [mockData[2], mockData[3]];

    return filteredPosts.filter((post) => post.category === category);
  };

  const filterMyPost = (postData: PostData[]) => {
    // 임시 유저id. 추후 조회 or 전역에서 받아올 예정
    const userId = 'tmpuserId6';
    return postData.filter((post) => post.author.id === userId);
  };

  const filteredPostList = filterPosts(
    isMyProfile ? filterMyPost(mockData) : mockData,
    selectedSort,
    selectedCategory,
  );

  return (
    <div className={cn('wrapper')}>
      <div className={cn('post-container')}>
        {/* 임시로 내 프로필에서는 filterMyPost함수 사용. 추후 수정 */}
        {filteredPostList.length ? (
          filteredPostList.map((postData) => (
            <PostPreview key={postData.id} postData={postData} />
          ))
        ) : (
          <div className={cn('no-post')}>포스트가 없습니다</div>
        )}
      </div>
    </div>
  );
}
