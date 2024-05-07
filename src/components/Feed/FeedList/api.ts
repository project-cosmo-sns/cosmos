import instance from '@/api/axios';

export async function getFeedList() {
  const feedData = await instance.get('/feed/list');
  return feedData.data;
}
