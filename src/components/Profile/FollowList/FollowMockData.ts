export interface FollowType {
  id: number;
  image: string;
  name: string;
  generation: number;
  isFollow?: boolean;
}

export const followerData: FollowType[] = [
  {
    id: 1,
    image: 'https://picsum.photos/200/300',
    name: '홍길동',
    generation: 1,
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300',
    name: '김철수',
    generation: 2,
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300',
    name: '이영희',
    generation: 5,
  },
  {
    id: 4,
    image: 'https://picsum.photos/200/300',
    name: '박민수',
    generation: 4,
  },
  {
    id: 5,
    image: 'https://picsum.photos/200/300',
    name: '정수진',
    generation: 2,
  },
  {
    id: 6,
    image: 'https://picsum.photos/200/300',
    name: '이상호',
    generation: 6,
  },
  {
    id: 7,
    image: 'https://picsum.photos/200/300',
    name: '김영미',
    generation: 3,
  },
  {
    id: 8,
    image: 'https://picsum.photos/200/300',
    name: '장호영',
    generation: 2,
  },
  {
    id: 9,
    image: 'https://picsum.photos/200/300',
    name: '서지우',
    generation: 5,
  },
  {
    id: 10,
    image: 'https://picsum.photos/200/300',
    name: '박준서',
    generation: 3,
  },
];

export const followingData: FollowType[] = [
  {
    id: 1,
    image: 'https://picsum.photos/200/300',
    name: 'John Doe',
    generation: 1,
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300',
    name: 'Jane Smith',
    generation: 2,
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300',
    name: 'Alex Johnson',
    generation: 3,
  },
  {
    id: 4,
    image: 'https://picsum.photos/200/300',
    name: 'Emma Wilson',
    generation: 4,
  },
  {
    id: 5,
    image: 'https://picsum.photos/200/300',
    name: 'Michael Brown',
    generation: 5,
  },
  {
    id: 6,
    image: 'https://picsum.photos/200/300',
    name: 'Sarah Davis',
    generation: 6,
  },
  {
    id: 7,
    image: 'https://picsum.photos/200/300',
    name: 'William Miller',
    generation: 1,
  },
  {
    id: 8,
    image: 'https://picsum.photos/200/300',
    name: 'Olivia Garcia',
    generation: 2,
  },
  {
    id: 9,
    image: 'https://picsum.photos/200/300',
    name: 'Daniel Martinez',
    generation: 3,
  },
  {
    id: 10,
    image: 'https://picsum.photos/200/300',
    name: 'Sophia Hernandez',
    generation: 4,
  },
];
