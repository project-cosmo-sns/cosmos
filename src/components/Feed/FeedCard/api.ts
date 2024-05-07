import instance from '@/api/axios';

export interface Edits {
  feedContent: string;
}

export async function deleteFeed(feedId: number) {
  await instance.delete(`/feed/${feedId}`);
}

export async function editFeed(
  feedId: number,
  data: Edits,
  imageUrls: string[],
) {
  await instance.patch(`/feed/${feedId}`, {
    content: data.feedContent,
    imageUrls,
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
