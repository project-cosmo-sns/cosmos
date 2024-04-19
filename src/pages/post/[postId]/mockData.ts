// 임시 데이터 및 타입
export interface Author {
  id: string;
  nickname: string;
  generation: string;
  profileImageUrl?: string;
}

export interface Comment {
  id: string;
  createdAt: string;
  author: Author;
  content: string;
  reactionCount: number;
  likedByCurrentUser: boolean;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface PostData {
  id: string;
  category: string;
  title: string;
  author: Author;
  createdAt: string;
  content: string;
  tags: Tag[];
  emoji: number;
  views: number;
  comments: Comment[];
}

const mockData: PostData[] = [
  {
    id: 'postId1',
    category: '공지사항',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId',
      nickname: '코스모스',
      generation: '3기',
    },
    createdAt: '2024-04-15T17:29:56',
    content:
      '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람  오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람  오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람  오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람  오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
    tags: [
      { id: 1, name: '#코스모스', color: 'red' },
      { id: 2, name: '#포스트', color: 'orange' },
      { id: 3, name: '#해시태그', color: 'yellow' },
      { id: 4, name: '#예시', color: 'green' },
      { id: 5, name: '#입니다', color: 'blue' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-04-18T17:29:56',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: '3기',
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: false,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-04-17T17:29:56',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: '3기',
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: true,
      },
    ],
  },
  {
    id: 'postId2',
    category: '공지사항',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId',
      nickname: '코스모스',
      generation: '3기',
    },
    createdAt: '2024-04-15T17:29:56',
    content:
      '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람  오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
    tags: [
      { id: 1, name: '#코스모스', color: 'red' },
      { id: 2, name: '#포스트', color: 'orange' },
      { id: 3, name: '#해시태그', color: 'yellow' },
      { id: 4, name: '#예시', color: 'green' },
      { id: 5, name: '#입니다', color: 'blue' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-04-18T17:29:56',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: '3기',
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-04-17T17:29:56',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: '3기',
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
  {
    id: 'postId3',
    category: '공지사항',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId',
      nickname: '코스모스',
      generation: '3기',
    },
    createdAt: '2024-04-15T17:29:56',
    content:
      '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람  오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
    tags: [
      { id: 1, name: '#코스모스', color: 'red' },
      { id: 2, name: '#포스트', color: 'orange' },
      { id: 3, name: '#해시태그', color: 'yellow' },
      { id: 4, name: '#예시', color: 'green' },
      { id: 5, name: '#입니다', color: 'blue' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-04-18T17:29:56',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: '3기',
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-04-17T17:29:56',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: '3기',
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
  {
    id: 'postId4',
    category: '공지사항',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId',
      nickname: '코스모스',
      generation: '3기',
    },
    createdAt: '2024-04-15T17:29:56',
    content:
      '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람  오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
    tags: [
      { id: 1, name: '#코스모스', color: 'red' },
      { id: 2, name: '#포스트', color: 'orange' },
      { id: 3, name: '#해시태그', color: 'yellow' },
      { id: 4, name: '#예시', color: 'green' },
      { id: 5, name: '#입니다', color: 'blue' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-04-18T17:29:56',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: '3기',
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-04-17T17:29:56',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: '3기',
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
];

export { mockData };
