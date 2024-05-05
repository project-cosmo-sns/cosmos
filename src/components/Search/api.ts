import { SearchResult } from './type';
import fetchData from '@/api/fetchData';

export async function getSearchList(keyword: string) {
  const searchData = await fetchData<SearchResult>({
    param: `/search/post/hash-tag?order=DESC&page=1&take=4&keyword=${keyword}`,
    method: 'get',
  });
  return searchData;
}
