export interface MemberDataType {
  nickname: string;
  introduce: string;
  profileImageUrl: string;
  memberId?: number;
  generation: number;
  followerCount: number;
  followingCount: number;
  authorizationStatus: 'NONE' | 'PENDING' | 'ACCEPT';
  //   NONE: 인증 신청 안한 사람
  // PENDING: 인증 신청 후 대기 중인 사람
  // ACCEPT: 인증 완료된 사람
}
