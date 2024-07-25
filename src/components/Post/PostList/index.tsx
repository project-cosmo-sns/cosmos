import fetchData from '@/api/fetchData';
import { CATEGORY_LIST } from '@/constants/categoryList';
import { SortType } from '@/constants/sortType';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import CategoryList from '../CategoryList';
import { PostListType } from '../types';
import styles from './PostList.module.scss';
import PostListContent from './PostListContent';
import { InfiniteData } from '@tanstack/react-query';

interface PostListProps {
  selectedSort?: SortType;
  initialPostList: PostListType;
}

const cn = classNames.bind(styles);

export default function PostList({
  selectedSort,
  initialPostList,
}: PostListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const queryParam = CATEGORY_LIST[selectedCategory]
    ? `&category=${selectedCategory}`
    : '';

  const initialData: InfiniteData<PostListType> = {
    pages: [initialPostList],
    pageParams: [1],
  };

  const {
    data: postListData,
    ref,
    refetch,
    isFetchingNextPage,
    isPending,
  } = useInfiniteScroll<PostListType>({
    queryKey: ['postList'],
    fetchFunction: (pageParam) =>
      fetchData({
        param: `/post/list?order=DESC&page=${pageParam}&take=10&sortBy=${selectedSort}${queryParam}`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialData,
  });

  const postDataList = postListData?.pages ?? [];

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedSort]);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('category-container')}>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {postDataList.map((post) => (
        <PostListContent key={post.meta.page} postDataList={post} />
      ))}
      {!isFetchingNextPage && <div ref={ref} />}
    </div>
  );
}
