import instance from '@/api/axios';

export async function getMyProfile() {
  try {
    const memberData = await instance.get('/profile/mine', {
      // headers: {
      //   'Authorization' : ``
      // }
    });
    console.log(memberData);
    return memberData;
  } catch (error) {
    console.error('프로필 정보 가져오기 실패:', error);
    throw error;
  }
}
