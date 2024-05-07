import { ContainerOptionType } from '@/@types/type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearKeyword, updateKeyword } from '@/redux/searchSlice';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContentContainer from '@/components/Common/ContentContainer';
import SearchAuthorProfileList from '@/components/Search/SearchAuthorProfileList';
import SearchList from '@/components/Search/SearchList';

export default function SearchResultPage() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('hashtag');
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const keyword: string = searchParams.get('query') || '';
  const reduxKeyword = useSelector((state: RootState) => state.search.keyword);

  useEffect(() => {
    dispatch(updateKeyword(keyword));
    return () => {
      dispatch(clearKeyword());
    };
  }, [dispatch, keyword]);

  let searchResultComponent;
  if (selectedOption === 'hashtag') {
    searchResultComponent = <SearchList keyword={reduxKeyword} />;
  } else {
    searchResultComponent = <SearchAuthorProfileList keyword={reduxKeyword} />;
  }

  return (
    <ContentContainer
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      keyword={reduxKeyword || '　'}
    >
      {searchResultComponent}
    </ContentContainer>
  );
}
