import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FollowDataProps } from '@/api/Follow';

type UseInfiniteScrollProps<T> = {
  queryKey: string[];
  fetchFunction: (page: number) => Promise<T>;
  getNextPageParam: (lastPage: T) => number | undefined;
};

/**
 * Intersection Observer를 사용하여 React Query와 함께 무한 스크롤을 구현하는 커스텀 훅입니다.
 * 이 훅은 사용자의 스크롤 위치에 따라 데이터 가져오기와 페이지네이션을 관리합니다.
 *
 * @param {Object} props - 훅 구성을 위한 객체입니다.
 * @param {Array} props.queryKey - 쿼리 캐시를 위한 키입니다. 각n 쿼리마다 고유해야 합니다.
 * @param {Function} props.fetchFunction - queryFn, fetchNextPage에 사용될 데이터를 가져오는 비동기 함수입니다.
 * @param {Function} props.getNextPageParam - 다음 페이지 번호를 반환하는 함수입니다. 더 이상 페이지가 없으면 undefined를 반환해야 합니다.
 * @returns {Object} 다음 속성을 포함하는 객체:
 *   - data: 가져온 데이터입니다.
 *   - fetchNextPage: 다음 페이지 데이터를 가져오는 함수입니다.
 *   - hasNextPage: 가져올 페이지가 더 있는지 여부를 나타내는 부울 값입니다.
 *   - ref: Intersection Observer와 함께 사용할 ref 객체입니다. 사용하는 컴포넌트 return문 아래에 ref={ref}로 추가해야 합니다.
 *   - ...rest: useInfiniteQuery에서 반환된 추가 속성들입니다.
 *
 *   - useInfiniteQuery는 pageParam과 pages객체를 반환합니다.
 *   - pageParam은 fetchFunction에 전달되는 페이지 번호입니다.
 *   - pages는 각 페이지의 데이터를 포함하는 객체로 data,와 meta반환
 */

export default function useInfiniteScroll({
  queryKey,
  fetchFunction,
  getNextPageParam,
}: UseInfiniteScrollProps<FollowDataProps>) {
  const { data, fetchNextPage, hasNextPage, ...rest } =
    useInfiniteQuery<FollowDataProps>({
      queryKey,
      queryFn: ({ pageParam }) => fetchFunction(pageParam as number),
      initialPageParam: 1,
      getNextPageParam,
    });

  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return { data, fetchNextPage, hasNextPage, ref, ...rest };
}

// QueryFunction<FollowDataProps, QueryKey, unknown>
