import instance from '@/api/axios';

export default async function getMyPostList() {
  const postData = await instance.get('/post/list');
  return postData.data;
}
