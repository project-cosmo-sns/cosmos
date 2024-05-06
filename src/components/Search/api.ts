import { SearchResult } from './type';
import fetchData from '@/api/fetchData';

// 별도로 빼고 싶은 욕심이 있는데 오류나서 일단 얜 안쓰게됨. 언젠가 꼭 분리하리라 하는 마음으로 남겨놓습니다....
export async function getSearchList(keyword: string) {
  const searchData = await fetchData<SearchResult>({
    param: `/search/post/hash-tag?order=DESC&page=1&take=4&keyword=${keyword}`,
  });
  return searchData;
}
