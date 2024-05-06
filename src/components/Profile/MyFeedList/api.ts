import instance from '@/api/axios';

export async function getMyFeedList() {
  // endpoint를 feed쪽으로 하면 잘 되는데 /profile/mine/feed는 오류남;;
  const myFeedData = await instance.get('/feed/list');
  return myFeedData.data;
}
