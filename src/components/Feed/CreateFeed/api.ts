import instance from '@/api/axios';
import { FeedType } from './type';

export async function postFeed(data: FeedType) {
  const request = await instance.post('/feed', {
    content: data.content,
  });
  console.log(request);
}
