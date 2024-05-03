import instance from '@/api/axios';

export async function getFeedDetails(feedId: number) {
  const data = await instance.get(`/feed/${feedId}/detail`);
  const feedDetails = data.data;
  return feedDetails;
}
