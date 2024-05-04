import fetchData from './fetchData';

export type FollowData = {
  followingInfo: {
    memberId: number;
    nickname: string;
    generation: number;
    profileImageUrl?: string;
    isFollow?: boolean;
  };
};

export async function getFollowingData(memberId: number) {
  const res = await fetchData<FollowData[]>({
    param: `/follow/${memberId}/following`,
  });
  return res;
}

// export async function getFollowerData(memberId: number) {
//   const res = await fetchData<FollowData[]>({
//     param: `/follow/${memberId}/follower`,
//   });
//   return res;
// }
