import { ContainerOptionType } from '@/@types/type';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ContentContainer from '@/components/Common/ContentContainer';
import SearchAuthorProfileList from '@/components/Search/SearchAuthorProfileList';
import SearchList from '@/components/Search/SearchList';
import { SearchResult } from '@/components/Search/type';
import NoSearchResult from '@/components/Search/NoSearchResult';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import fetchData from '@/api/fetchData';

export default function SearchResultPage() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('hashtag');
  const searchParams = useSearchParams();
  const keyword: string = searchParams.get('query') || '';

  const { data: searchResult, isLoading } = useQuery<SearchResult>({
    queryKey: ['searchList', keyword],
    queryFn: () =>
      fetchData({
        param: `/search/post/hash-tag?order=DESC&page=1&take=4&keyword=${keyword}`,
      }),
  });

  let searchResultComponent;

  if (isLoading) {
    searchResultComponent = <LoadingSpinner />;
  } else if (!searchResult || searchResult.data.length === 0) {
    searchResultComponent = <NoSearchResult />;
  } else {
    searchResultComponent =
      selectedOption === 'hashtag' ? (
        <SearchList searchList={searchResult.data} />
      ) : (
        <SearchAuthorProfileList />
      );
  }

  return (
    <ContentContainer
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      keyword={keyword}
    >
      {searchResultComponent}
    </ContentContainer>
  );
}
