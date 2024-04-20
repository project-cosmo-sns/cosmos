export interface MemberDataType {
  id: string;
  profile_img: string;
  nickname: string;
  generation: number;
  introduce: string;
}

const memberMockData: MemberDataType[] = [
  {
    id: '1',
    profile_img: '/images/like.svg',
    nickname: '짱정이',
    generation: 3,
    introduce: '저는 짱정이입니다. 코딩 잘하고 싶어요.',
  },
];

export { memberMockData };
