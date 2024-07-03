import fetchData from '@/api/fetchData';
import PostListContent from '@/components/Post/PostList/PostListContent';
import { PostListType } from '@/components/Post/types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import classNames from 'classnames/bind';
import styles from '../MyPostList/MyPostList.module.scss';

interface MyScrapListProps {
  scrapList: PostListType;
}

const cn = classNames.bind(styles);

export default function MyScrapList({ scrapList }: MyScrapListProps) {
  const {
    data: scrapListData,
    ref,
    isFetchingNextPage,
    isPending,
  } = useInfiniteScroll<PostListType>({
    queryKey: ['scrapList'],
    fetchFunction: (pageParam) =>
      fetchData({
        param: `/profile/mine/scrap?order=DESC&page=${pageParam}&take=10`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const scrapDataList = scrapListData?.pages ?? [];

  return (
    <div className={cn('wrapper')}>
      <div className={cn('post-container')}>
        {isPending ? (
          <PostListContent postDataList={scrapList} />
        ) : (
          scrapDataList.map((scrap) => (
            <PostListContent key={scrap.meta.page} postDataList={scrap} />
          ))
        )}
        {!isFetchingNextPage && <div ref={ref} />}
      </div>
    </div>
  );
}
