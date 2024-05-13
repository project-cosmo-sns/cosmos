// SSR로 가져온 데이터를 쿼리 데이터로 저장 (mutation 후 리패치 위한 작업)

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMemberData } from './api';
import { useEffect } from 'react';

const queryClient = useQueryClient();
useEffect(() => {
  if (memberData) {
    queryClient.setQueryData(['memberData'], memberData);
  }
  if (myFeedList) {
    queryClient.setQueryData(['myFeedList'], myFeedList);
  }
  if (myPostList) {
    queryClient.setQueryData(['myPostList'], myPostList);
  }
}, [queryClient]);

useQuery({
  queryKey: ['memberData'],
  queryFn: async () => {
    const result = await fetchMemberData(context);
    return { props: { memberData: result.memberData } };
  }, // 여기서 MemberDataType만 반환,
  // initialData: memberData,
});
