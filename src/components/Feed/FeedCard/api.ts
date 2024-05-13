import instance from '@/api/axios';
import { FeedType } from '@/components/Feed/CreateFeed/type';

export interface Edits {
  content: string;
  feedImage: string[];
}

export interface EditFeedTypes {
  feedId: number;
  data: FeedType;
}

export async function deleteFeed(feedId: number) {
  await instance.delete(`/feed/${feedId}`);
}

export async function editFeed(feedId: number, data: FeedType) {
  await instance.patch(`/feed/${feedId}`, {
    content: data.content,
    imageUrls: data.feedImage,
  });
}

export async function postFeedEmoji(feedId: number, emojiCode: string) {
  await instance.post(`feed/${feedId}/emoji`, {
    emoji: emojiCode,
  });
}

export async function deleteFeedEmoji(feedId: number, emojiId: number) {
  await instance.delete(`feed/${feedId}/emoji/${emojiId}`);
}
