import { ContainerOptionType } from '@/@types/type';
import { useSearchParams } from 'next/navigation';
import ContentContainer from '@/components/Common/ContentContainer';
import SearchAuthorProfileList from '@/components/Search/SearchAuthorProfileList';
import SearchList from '@/components/Search/SearchList';
import { useState, useEffect } from 'react';
import { getSearchList } from '@/components/Search/api';

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
  const [searchList, setSearchList] = useState(null);

  const searchParams = useSearchParams();
  const search = searchParams.get('query');
  const keyword = search || '';

  useEffect(() => {
    if (keyword) {
      const fetchData = async () => {
        try {
          const result = await getSearchList(keyword);
          setSearchList(result.data);
        } catch (error) {
          console.error(
            '검색 결과를 가져오는 동안 오류가 발생했습니다:',
            error,
          );
        }
      };

      fetchData();
    }
  }, [keyword]);

  let searchResultComponent;
  if (searchList) {
    searchResultComponent =
      selectedOption === 'hashtag' ? (
        <SearchList selectedSort="all" data={searchList} />
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
