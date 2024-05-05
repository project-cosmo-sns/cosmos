import { ContainerOptionType } from '@/@types/type';
import { useSearchParams } from 'next/navigation';
import ContentContainer from '@/components/Common/ContentContainer';
import SearchAuthorProfileList from '@/components/Search/SearchAuthorProfileList';
import SearchList from '@/components/Search/SearchList';
import { useState, useEffect } from 'react';
import { getSearchList } from '@/components/Search/api';
import { SearchData } from '@/components/Search/type';

// serverside 임시 주석
// export const getServerSideProps = async ({ query }: any) => {
//   const { keyword } = query;
//   const searchList = await getSearchList(keyword);
//   return {
//     props: {
//       searchList: searchList.data,
//     },
//   };
// };

export default function SearchResultPage() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('hashtag');
  const [searchList, setSearchList] = useState<SearchData[]>([]);

  const searchParams = useSearchParams();
  const search = searchParams.get('query');
  const keyword = search || '';

  const loadSearchData = async () => {
    try {
      const result = await getSearchList(keyword);
      setSearchList(result.data);
    } catch (error) {
      console.error('검색 결과 오류', error);
    }
  };

  useEffect(() => {
    if (keyword) {
      loadSearchData();
    }
  }, [keyword]);

  let searchResultComponent;
  if (searchList) {
    searchResultComponent =
      selectedOption === 'hashtag' ? (
        <SearchList searchList={searchList} />
      ) : (
        <SearchAuthorProfileList />
      );
  } else {
    // 이것도 컴포넌트화해서 바꿔야됨
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
