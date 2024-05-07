import fetchData from './fetchData';
import { metaType } from '@/@types/type';

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
  meta: metaType;
};

export async function getMyFollowingData(page = 1) {
  const res = await fetchData<FollowDataProps[]>({
    param: `follow/following/mine?order=DESC&page=${page}&take=3`,
  });
  return res;
}

export async function getMyFollowerData(page = 1) {
  const res = await fetchData<FollowDataProps[]>({
    param: `follow/follower/mine?order=DESC&page=${page}&take=3`,
  });
  return res;
}
