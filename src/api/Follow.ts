import fetchData from './fetchData';

type UserInfo = {
  memberId: number;
  nickname: string;
  generation: number;
  profileImageUrl?: string;
  isFollow?: boolean;
};

export type FollowDataProps = {
  followerInfo: UserInfo;
  followingInfo: UserInfo;
};

export async function getMyFollowingData() {
  const res = await fetchData<FollowDataProps[]>({
    param: 'follow/following/mine',
  });
  return res;
}

export async function getMyFollowerData() {
  const res = await fetchData<FollowDataProps[]>({
    param: 'follow/follower/mine',
  });
  return res;
}

export async function getUserFollowingData(memberId: number) {
  const res = await fetchData<FollowDataProps[]>({
    param: `/follow/${memberId}/following`,
  });
  return res;
}

export async function getUserFollowerData(memberId: number) {
  const res = await fetchData<FollowDataProps[]>({
    param: `/follow/${memberId}/follower`,
  });
  return res;
}

export async function addFollow(memberId: number) {
  const res = await fetchData({
    param: `/follow/${memberId}`,
    method: 'post',
  });
  return res;
}

export async function deleteFollow(memberId: number) {
  const res = await fetchData({
    param: `/follow/${memberId}`,
    method: 'delete',
  });
  return res;
}
