import { GetServerSidePropsContext } from 'next';
import instance from './axios';

export async function fetchInitialPost<T>(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie || '';

  const response = await instance.get<T>(`/post/list`, {
    headers: {
      Cookie: cookies,
    },
  });

  return {
    props: {
      response: response.data,
    },
  };
}
