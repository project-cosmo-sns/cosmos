import { ContainerOptionType } from '@/@types/type';
import { useSearchParams } from 'next/navigation';
import ContentContainer from '@/components/Common/ContentContainer';
import SearchAuthorProfileList from '@/components/Search/SearchAuthorProfileList';
import SearchList from '@/components/Search/SearchList';
import { useState } from 'react';
import instance from '@/api/axios';

// 흠.... 쿼리값 어떻게 놓을지 고민해야됨 + 전역화

export async function getSearchList() {
  const feedData = await instance.get('/search/post/hash-tag?');
  return feedData.data;
}

export const getServerSideProps = async () => {
  const searchList = await getSearchList();
  return {
    props: {
      feedList: searchList.data,
    },
  };
};

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
