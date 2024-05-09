import fetchData from './fetchData';
import { metaType } from '@/@types/type';

type UserInfo = {
  memberId: number;
  nickname: string;
  generation: number;
  profileImageUrl?: string;
};

export type FollowDataProps = {
  followerInfo: UserInfo;
  followingInfo: UserInfo;
  meta: metaType;
};

export interface FollowResponseType {
  data: FollowDataProps[];
  meta: metaType;
}

export async function getMyFollowingData(page = 1) {
  const res = await fetchData<FollowResponseType>({
    param: `follow/following/mine?order=DESC&page=${page}&take=10`,
  });
  return res;
}

export async function getMyFollowerData(page = 1) {
  const res = await fetchData<FollowResponseType>({
    param: `follow/follower/mine?order=DESC&page=${page}&take=10`,
  });
  return res;
}

export async function getUserFollowingData(memberId: number, page = 1) {
  const res = await fetchData<FollowResponseType>({
    param: `follow/${memberId}/following?order=DESC&page=${page}&take=10`,
  });
  return res;
}

export async function getUserFollowerData(memberId: number, page = 1) {
  const res = await fetchData<FollowResponseType>({
    param: `follow/${memberId}/follower?order=DESC&page=${page}&take=10`,
  });
  return res;
}

export async function deleteFollow(memberId: number) {
  const res = await fetchData({
    param: `/follow/${memberId}/remove`,
    method: 'delete',
  });
  return res;
}
