import instance from '@/api/axios';
import { FeedType } from './type';

export async function postFeed(data: FeedType) {
  await instance.post('/feed', {
    content: data.content,
    imageUrls: data.feedImage,
  });
}
