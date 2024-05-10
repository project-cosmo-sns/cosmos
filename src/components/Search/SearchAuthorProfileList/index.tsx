import classNames from 'classnames/bind';
import styles from './SearchAuthorProfileList.module.scss';
import SearchAuthorProfile from '../SearchAuthorProfile';
import { SearchMemberResultData } from '@/components/Search/type';
import fetchData from '@/api/fetchData';
import NoSearchResult from '@/components/Search/NoSearchResult';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const cn = classNames.bind(styles);

interface SearchAuthorProfileListProps {
  keyword: string;
}

export default function SearchAuthorProfileList({
  keyword,
}: SearchAuthorProfileListProps) {
  const {
    data: searchProfileData,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<SearchMemberResultData>({
    queryKey: ['searchProfileList', keyword],
    fetchFunction: (pageParams) =>
      fetchData({
        param: `/search/member/name?order=DESC&page=${pageParams}&take=8&keyword=${keyword}`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const searchProfileList = searchProfileData?.pages ?? [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (searchProfileList[0].data.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <div className={cn('wrapper')}>
      {searchProfileList.map((profile) =>
        profile.data.map((profileData) => (
          <SearchAuthorProfile
            key={profileData.member.id}
            member={profileData.member}
          />
        )),
      )}
      {!isFetchingNextPage && <div ref={ref} />}
    </div>
  );
}
