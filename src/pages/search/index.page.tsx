import { ContainerOptionType } from '@/@types/type';
import { useSearchParams } from 'next/navigation';
import ContentContainer from '@/components/Common/ContentContainer';
import SearchAuthorProfileList from '@/components/Search/SearchAuthorProfileList';
import SearchList from '@/components/Search/SearchList';
import { useState } from 'react';

export default function SearchResultPage() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('hashtag');
  const searchParams = useSearchParams();
  const search = searchParams.get('query');
  const keyword = search || '';

  let searchResultComponent;
  if (keyword) {
    searchResultComponent =
      selectedOption === 'hashtag' ? (
        <SearchList selectedSort="all" />
      ) : (
        <SearchAuthorProfileList />
      );
  } else {
    searchResultComponent = <p>검색 결과가 없습니다.</p>;
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
