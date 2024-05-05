import SearchPreview from '../SearchPriview';
import { SearchResult } from '../type';
import styles from './SearchList.module.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import NoSearchResult from '@/components/Search/NoSearchResult';
import fetchData from '@/api/fetchData';

interface SearchListProps {
  keyword: string;
}

const cn = classNames.bind(styles);

export default function SearchList({ keyword }: SearchListProps) {
  const {
    data: searchList,
    isLoading,
    isSuccess,
  } = useQuery<SearchResult>({
    queryKey: ['searchList', keyword],
    queryFn: () =>
      fetchData({
        param: `/search/post/hash-tag?order=DESC&page=1&take=4&keyword=${keyword}`,
      }),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isSuccess || !searchList.data || searchList.data.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <div className={cn('search-list')}>
      {searchList.data.map((searchData) => (
        <SearchPreview key={searchData.post.id} searchData={searchData} />
      ))}
    </div>
  );
}
