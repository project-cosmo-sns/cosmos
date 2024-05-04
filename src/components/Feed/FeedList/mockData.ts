import { Author } from '@/pages/post/[postId]/mockData';

interface Image {
  imageUrl: string;
}
interface FeedData {
  id: number;
  author: Author;
  createdAt: string;
  content: string;
  images: Image[] | null;
  reactionCount: number;
  commentsCount: number;
  eyeCount: number;
}

const MOCKDATA: FeedData[] = [
  {
    id: 0,
    author: {
      id: 'tempUserId1',
      nickname: 'Kim Tonggae',
      generation: 3,
    },
    createdAt: '2024-04-19',
    content:
      '좋은 글이 있어서 공유 드립니다! https://developer.mozilla.org/ko/docs/Web/CSS/object-fit',
    images: [
      {
        imageUrl:
          'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
      },
      {
        imageUrl:
          'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
      },
    ],
    reactionCount: 3,
    commentsCount: 10,
    eyeCount: 50,
  },
  {
    id: 1,
    author: {
      id: 'tempUserId2',
      nickname: 'Alice Smith',
      generation: 2,
    },
    createdAt: '2024-04-20',
    content:
      'Just finished reading an amazing book! Highly recommend it to everyone.',
    images: [
      {
        imageUrl:
          'https://flexible.img.hani.co.kr/flexible/normal/970/644/imgdb/resize/2019/0404/00503871_20190404.JPG',
      },
      {
        imageUrl:
          'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
      },
      {
        imageUrl:
          'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
      },
      {
        imageUrl:
          'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
      },
    ],
    reactionCount: 12,
    commentsCount: 5,
    eyeCount: 35,
  },
  {
    id: 2,
    author: {
      id: 'tempUserId3',
      nickname: 'John Doe',
      generation: 1,
    },
    createdAt: '2024-04-21',
    content: 'Excited to announce the launch of our new product! Check it out.',
    images: [
      {
        imageUrl:
          'https://www.sputnik.kr/article_img/202209/article_1663979627.jpg',
      },
    ],
    reactionCount: 8,
    commentsCount: 15,
    eyeCount: 65,
  },
  {
    id: 3,
    author: {
      id: 'tempUserId4',
      nickname: 'Emily Johnson',
      generation: 2,
    },
    createdAt: '2024-04-22',
    content: 'Feeling grateful for the support of my friends and family!',
    images: [
      {
        imageUrl:
          'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
      },
      {
        imageUrl:
          'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
      },
      {
        imageUrl:
          'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
      },
    ],
    reactionCount: 5,
    commentsCount: 3,
    eyeCount: 20,
  },
  {
    id: 4,
    author: {
      id: 'tempUserId5',
      nickname: 'David Lee',
      generation: 3,
    },
    createdAt: '2024-04-23',
    content:
      'Just returned from a fantastic vacation. Refreshed and ready to tackle new challenges!',
    images: null,
    reactionCount: 20,
    commentsCount: 8,
    eyeCount: 40,
  },
  {
    id: 5,
    author: {
      id: 'tempUserId6',
      nickname: 'Sophia Rodriguez',
      generation: 2,
    },
    createdAt: '2024-04-24',
    content:
      "Huge shoutout to the amazing team I work with. Couldn't have asked for better colleagues!",
    images: null,
    reactionCount: 15,
    commentsCount: 6,
    eyeCount: 25,
  },
  {
    id: 6,
    author: {
      id: 'tempUserId7',
      nickname: 'Michael Brown',
      generation: 1,
    },
    createdAt: '2024-04-25',
    content: 'Just adopted a rescue dog. Meet our newest family member!',
    images: [
      {
        imageUrl:
          'https://s3.ap-northeast-2.amazonaws.com/s3.uplife.uplus.co.kr/static/lguplus-event-daily-life/upload/contents/contentsDetail_0_20220224172602.jpg',
      },
      {
        imageUrl:
          'https://s3.ap-northeast-2.amazonaws.com/s3.uplife.uplus.co.kr/static/lguplus-event-daily-life/upload/contents/contentsDetail_0_20220224172602.jpg',
      },
      {
        imageUrl:
          'https://s3.ap-northeast-2.amazonaws.com/s3.uplife.uplus.co.kr/static/lguplus-event-daily-life/upload/contents/contentsDetail_0_20220224172602.jpg',
      },
      {
        imageUrl:
          'https://s3.ap-northeast-2.amazonaws.com/s3.uplife.uplus.co.kr/static/lguplus-event-daily-life/upload/contents/contentsDetail_0_20220224172602.jpg',
      },
      {
        imageUrl:
          'https://s3.ap-northeast-2.amazonaws.com/s3.uplife.uplus.co.kr/static/lguplus-event-daily-life/upload/contents/contentsDetail_0_20220224172602.jpg',
      },
      {
        imageUrl:
          'https://s3.ap-northeast-2.amazonaws.com/s3.uplife.uplus.co.kr/static/lguplus-event-daily-life/upload/contents/contentsDetail_0_20220224172602.jpg',
      },
    ],
    reactionCount: 18,
    commentsCount: 12,
    eyeCount: 30,
  },
];

export { MOCKDATA };
