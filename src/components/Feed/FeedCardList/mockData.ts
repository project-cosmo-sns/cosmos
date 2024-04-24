import { Author } from '@/pages/post/[postId]/mockData';

export interface FeedData {
  id: string;
  author: Author;
  createdAt: string;
  content: string;
  reactionCount: number;
  commentsCount: number;
  eyeCount: number;
}

const MOCKDATA = [
  {
    id: 'feedId1',
    author: {
      id: 'tempUserId1',
      nickname: 'Kim Tonggae',
      generation: 3,
    },
    createdAt: '2024-04-19',
    content:
      'Has anyone seen a genuine iPhone charger cable on WeWork? I think I lost it..!!',
    reactionCount: 3,
    commentsCount: 10,
    eyeCount: 50,
  },
  {
    id: 'feedId2',
    author: {
      id: 'tempUserId2',
      nickname: 'Alice Smith',
      generation: 2,
    },
    createdAt: '2024-04-20',
    content:
      'Just finished reading an amazing book! Highly recommend it to everyone.',
    reactionCount: 12,
    commentsCount: 5,
    eyeCount: 35,
  },
  {
    id: 'feedId3',
    author: {
      id: 'tempUserId3',
      nickname: 'John Doe',
      generation: 1,
    },
    createdAt: '2024-04-21',
    content: 'Excited to announce the launch of our new product! Check it out.',
    reactionCount: 8,
    commentsCount: 15,
    eyeCount: 65,
  },
  {
    id: 'feedId4',
    author: {
      id: 'tempUserId4',
      nickname: 'Emily Johnson',
      generation: 2,
    },
    createdAt: '2024-04-22',
    content: 'Feeling grateful for the support of my friends and family!',
    reactionCount: 5,
    commentsCount: 3,
    eyeCount: 20,
  },
  {
    id: 'feedId5',
    author: {
      id: 'tempUserId5',
      nickname: 'David Lee',
      generation: 3,
    },
    createdAt: '2024-04-23',
    content:
      'Just returned from a fantastic vacation. Refreshed and ready to tackle new challenges!',
    reactionCount: 20,
    commentsCount: 8,
    eyeCount: 40,
  },
  {
    id: 'feedId6',
    author: {
      id: 'tempUserId6',
      nickname: 'Sophia Rodriguez',
      generation: 2,
    },
    createdAt: '2024-04-24',
    content:
      "Huge shoutout to the amazing team I work with. Couldn't have asked for better colleagues!",
    reactionCount: 15,
    commentsCount: 6,
    eyeCount: 25,
  },
  {
    id: 'feedId7',
    author: {
      id: 'tempUserId7',
      nickname: 'Michael Brown',
      generation: 1,
    },
    createdAt: '2024-04-25',
    content: 'Just adopted a rescue dog. Meet our newest family member!',
    reactionCount: 18,
    commentsCount: 12,
    eyeCount: 30,
  },
];

const MOCKDATA2 = [
  {
    id: 'feedId1',
    author: {
      id: 'tempUserId1',
      nickname: '김똥개',
      generation: 3,
    },
    createdAt: '2024-04-19',
    content:
      '위워크에서 아이폰 충전기 정품 케이블 보신 분 있나요? 분실한 거 같아요..!!',
    reactionCount: 3,
    commentsCount: 10,
    eyeCount: 50,
  },
];

export { MOCKDATA, MOCKDATA2 };