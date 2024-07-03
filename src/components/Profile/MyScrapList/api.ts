import instance from '@/api/axios';
import { PostListType } from '@/components/Post/types';
import { GetServerSidePropsContext } from 'next/types';

export default async function getMyScrapList(
  context: GetServerSidePropsContext,
) {
  const { req } = context;
  const cookies = req.headers.cookie || '';

  const endpoint = '/profile/mine/scrap';

  const scrapData: PostListType = await instance.get(endpoint, {
    headers: {
      Cookie: cookies,
    },
    // withCredentials: true,
  });
  return scrapData;
}
