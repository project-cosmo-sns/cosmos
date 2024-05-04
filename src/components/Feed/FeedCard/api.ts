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
