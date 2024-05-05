import fetchData from '@/api/fetchData';
import instance from '@/api/axios';

// 서치 아이템 타입 넣어줘야 하는데 일단 any로 확인해보려고 대체함...
export async function getSearchList(keyword: string) {
  const searchData = await fetchData<any>({
    param: `/search/post/hash-tag?order=DESC&page=1&take=4&keyword=${keyword}`,
    method: 'get',
  });
  return searchData;
}

// export async function getSearchList(keyword: string) {
//   const feedData = await instance.get(
//     `/search/post/hash-tag?order=DESC&page=1&take=4&keyword=${keyword}`,
//   );
//   return feedData.data;
// }
