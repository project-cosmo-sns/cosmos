import instance from '@/api/axios';

export async function deleteFeed(feedId: number) {
  await instance.delete(`/feed/${feedId}`);
}

export async function editFeed(feedId: number, data, imageUrls: string[]) {
  await instance.patch(`/feed/${feedId}`, {
    content: data.feedContent,
    imageUrls,
  });
}
