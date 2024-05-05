import classNames from 'classnames/bind';
import styles from './SearchAuthorProfileList.module.scss';
import SearchAuthorProfile from '../SearchAuthorProfile';
import { SearchMemberResultData } from '@/components/Search/type';
import { useQuery } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import NoSearchResult from '@/components/Search/NoSearchResult';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const cn = classNames.bind(styles);

interface SearchAuthorProfileListProps {
  keyword: string;
}

export default function SearchAuthorProfileList({
  keyword,
}: SearchAuthorProfileListProps) {
  const {
    data: searchProfileResult,
    isLoading,
    isSuccess,
  } = useQuery<SearchMemberResultData>({
    queryKey: ['searchProfileList', keyword],
    queryFn: () =>
      fetchData({
        param: `/search/member/name?order=DESC&page=1&take=4&keyword=${keyword}`,
      }),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (
    !isSuccess ||
    !searchProfileResult.data ||
    searchProfileResult.data.length === 0
  ) {
    return <NoSearchResult />;
  }

  return (
    <div className={cn('wrapper')}>
      {searchProfileResult.data.map((profileData) => (
        <SearchAuthorProfile
          key={profileData.member.id}
          member={profileData.member}
        />
      ))}
    </div>
  );
}
