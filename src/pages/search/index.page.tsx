import { ContainerOptionType } from '@/@types/type';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ContentContainer from '@/components/Common/ContentContainer';
import SearchAuthorProfileList from '@/components/Search/SearchAuthorProfileList';
import SearchList from '@/components/Search/SearchList';

export default function SearchResultPage() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('hashtag');
  const searchParams = useSearchParams();
  const keyword: string = searchParams.get('query') || '';

  let searchResultComponent;
  if (selectedOption === 'hashtag') {
    searchResultComponent = <SearchList keyword={keyword} />;
  } else {
    searchResultComponent = <SearchAuthorProfileList keyword={keyword} />;
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
