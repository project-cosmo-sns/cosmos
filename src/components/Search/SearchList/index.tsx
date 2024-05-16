import PostPreview from '@/components/Post/PostPreview';
import { SearchResult } from '../type';
import styles from './SearchList.module.scss';
import classNames from 'classnames/bind';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import NoSearchResult from '@/components/Search/NoSearchResult';
import fetchData from '@/api/fetchData';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useToast } from '@/hooks/useToast';
import { useOpenLoginModal } from '@/hooks/useOpenLoginModal';
import { useEffect } from 'react';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';
import { useRouter } from 'next/router';

interface SearchListProps {
  keyword: string;
}

const cn = classNames.bind(styles);

export default function SearchList({ keyword }: SearchListProps) {
  const router = useRouter();
  const {
    data: searchListData,
    ref,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteScroll<SearchResult>({
    queryKey: ['searchList', keyword],
    fetchFunction: (pageParams) =>
      fetchData({
        param: `/search/post/hash-tag?order=DESC&page=${pageParams}&take=4&keyword=${keyword}`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    enabled: false,
  });

  const searchList = searchListData?.pages ?? [];

  const { showToastHandler } = useToast();
  const { showLoginModalHandler } = useOpenLoginModal();
  const {
    isSuccess: isMemberStatusSuccess,
    isLogin,
    isAuthorized,
  } = useFetchMemberStatus();

  useEffect(() => {
    if (isMemberStatusSuccess)
      if (isLogin) {
        if (isAuthorized) {
          refetch();
        } else {
          router.replace('/');
          showToastHandler('인증된 사용자만 확인할 수 있습니다', 'warn');
        }
      } else {
        router.replace('/');
        showLoginModalHandler();
      }
  }, [isMemberStatusSuccess]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (searchList[0]?.data.length === 0) {
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
