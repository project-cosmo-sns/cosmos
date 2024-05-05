export interface MemberDataType {
  memberId?: number;
  nickname: string;
  generation: number;
  profileImageUrl: string;
  introduce: string;
  followerCount: number;
  followingCount: number;
}

const memberMockData: MemberDataType[] = [
  {
    memberId: 1,
    nickname: '짱정이',
    generation: 3,
    profileImageUrl: '/images/like.svg',
    introduce: '졸려요',
    followerCount: 5,
    followingCount: 5,
  },
];

export { memberMockData };
