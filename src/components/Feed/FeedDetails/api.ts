import instance from '@/api/axios';

export async function getFeedDetails(feedId: number) {
  const data = await instance.get(`/feed/${feedId}/detail`);
  const feedDetails = data.data;
  return feedDetails;
}

export async function getFeedCommentList(feedId: number) {
  const data = await instance.get(`feed/${feedId}/comment/list`);
  const feedCommentList = data.data.data;
  return feedCommentList;
}
