import PostPreview from '@/components/Post/PostPreview';
import { SearchResult } from '../type';
import styles from './SearchList.module.scss';
import classNames from 'classnames/bind';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import NoSearchResult from '@/components/Search/NoSearchResult';
import fetchData from '@/api/fetchData';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface SearchListProps {
  keyword: string;
}

const cn = classNames.bind(styles);

export default function SearchList({ keyword }: SearchListProps) {
  const {
    data: searchListData,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<SearchResult>({
    queryKey: ['searchList', keyword],
    fetchFunction: (pageParams) =>
      fetchData({
        param: `/search/post/hash-tag?order=DESC&page=${pageParams}&take=4&keyword=${keyword}`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const searchList = searchListData?.pages ?? [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (searchList[0].data.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <div className={cn('search-list')}>
      {searchList.map((search) =>
        search.data.map((searchData) => (
          <PostPreview key={searchData.post.id} postData={searchData} />
        )),
      )}
      {!isFetchingNextPage && <div ref={ref} />}
    </div>
  );
}
