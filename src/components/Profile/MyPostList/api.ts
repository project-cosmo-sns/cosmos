import instance from '@/api/axios';
import { GetServerSidePropsContext } from 'next/types';

export default async function getMyPostList(
  context: GetServerSidePropsContext,
) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const { memberId } = context.query;

  const postData = await instance.get('/profile/mine/post', {
    headers: {
      Cookie: cookies,
    },
    // withCredentials: true,
  });
  return postData.data;
}
