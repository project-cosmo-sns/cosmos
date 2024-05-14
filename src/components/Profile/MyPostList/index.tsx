import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { PostListType } from '@/components/Post/types';
import styles from './MyPostList.module.scss';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import fetchData from '@/api/fetchData';
import PostListContent from '@/components/Post/PostList/PostListContent';
import { MemberDataType } from '@/pages/profile/types';

interface PostListProps {
  postList: PostListType;
  memberData: MemberDataType;
}

export default function MyPostList({ postList, memberData }: PostListProps) {
  const cn = classNames.bind(styles);

  // if (memberData.memberId !== undefined) {
  //   const currentUserId = memberData.memberId;
  // }
  const memberId = memberData?.memberId ?? 'mine';

  // 멤버 데이터가 없을 수도 있나...?
  // 내 포스트 경우엔 어떻게 분류하지?
  // memberId가 아니라 writer의 id값을 사용할 수 있을까?

  // 카테고리 값이 api에 없음. 일단
  // const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  // const queryParam = CATEGORY_LIST[selectedCategory]
  //   ? `&category=${selectedCategory}`
  //   : '';

  // 만약 나의 memberData에도 memberId가 추가돼도
  // !memberData.memberId가 아닌, 비교해서 나인지 확인한다든지... 하는 로직이 있으면 되지 않나...

  const endpoint = `/profile/${memberId}/post?order=DESC`;

  const {
    data: postListData,
    ref,
    refetch,
    isFetchingNextPage,
    isPending,
  } = useInfiniteScroll<PostListType>({
    queryKey: ['postList', 'memberData', memberId],
    fetchFunction: (pageParam) =>
      fetchData({
        // 내 포스트
        // `/profile/mine/post?order=DESC&page=1&take=10 `
        // 다른 사람 포스트
        // mine 대신 id
        param: `${endpoint}&page=${pageParam}&take=10`,
      }),

    // /profile/mine/undefined?order=DESC&page=1&take=10 404 (Not Found)
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const postDataList = postListData?.pages ?? [];

  useEffect(() => {
    refetch();
  }, [memberId]);

  return (
    <div className={cn('wrapper')}>
      {/* <div className={cn('category-container')}>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div> */}

      <div className={cn('post-container')}>
        {/* {postList.data.length ? (
          postList.data.map((postData) => (
            <PostPreview
              key={postData.postListInfo.post.id}
              postData={postData.postListInfo}
            />
          ))
        ) : (
          <div className={cn('no-post')}>포스트가 없습니다.</div>
        )} */}

        {isPending ? (
          <PostListContent postDataList={postList} />
        ) : (
          postDataList.map((post) => (
            <PostListContent key={post.meta.page} postDataList={post} />
          ))
        )}
        {!isFetchingNextPage && <div ref={ref} />}
      </div>
    </div>
  );
}
