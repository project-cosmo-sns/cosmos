// export interface FollowType {
//   id: number;
//   image: string;
//   name: string;
//   generation: number;
//   isFollow?: boolean;
// }

// export interface MemberType {
//   id: number;
//   nickname: string;
//   profile_image_url: string;
//   generation: number;
//   introduce: string;
//   is_comment_notification: boolean;
//   is_emoji_notification: boolean;
//   is_follow_notification: boolean;
//   is_authorized: boolean;
//   deleted_at: string | null;
//   created_at: string;
//   updated_at: string;
//   sessionId: string;
// }

// export const memberData: MemberType[] = [
//   {
//     id: 1,
//     nickname: '박지은',
//     profile_image_url: 'https://randomuser.me/api/portraits/women/1.jpg',
//     generation: 6,
//     introduce: '안녕하세요, 박지은입니다.',
//     is_comment_notification: true,
//     is_emoji_notification: false,
//     is_follow_notification: true,
//     is_authorized: true,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'A3A5D',
//   },
//   {
//     id: 2,
//     nickname: '김민준',
//     profile_image_url: 'https://randomuser.me/api/portraits/men/2.jpg',
//     generation: 4,
//     introduce: '안녕하세요, 김민준입니다.',
//     is_comment_notification: false,
//     is_emoji_notification: true,
//     is_follow_notification: true,
//     is_authorized: false,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'B4B7E',
//   },
//   {
//     id: 3,
//     nickname: '이서연',
//     profile_image_url: 'https://randomuser.me/api/portraits/women/3.jpg',
//     generation: 1,
//     introduce: '안녕하세요, 이서연입니다.',
//     is_comment_notification: true,
//     is_emoji_notification: true,
//     is_follow_notification: false,
//     is_authorized: true,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'C8C1F',
//   },
//   {
//     id: 4,
//     nickname: '정민서',
//     profile_image_url: 'https://randomuser.me/api/portraits/women/4.jpg',
//     generation: 5,
//     introduce: '안녕하세요, 정민서입니다.',
//     is_comment_notification: false,
//     is_emoji_notification: false,
//     is_follow_notification: false,
//     is_authorized: true,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'D9D2A',
//   },
//   {
//     id: 5,
//     nickname: '이민수',
//     profile_image_url: 'https://randomuser.me/api/portraits/men/5.jpg',
//     generation: 2,
//     introduce: '안녕하세요, 이민수입니다.',
//     is_comment_notification: true,
//     is_emoji_notification: false,
//     is_follow_notification: true,
//     is_authorized: false,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'E7E8B',
//   },
//   {
//     id: 6,
//     nickname: '최현우',
//     profile_image_url: 'https://randomuser.me/api/portraits/men/6.jpg',
//     generation: 6,
//     introduce: '안녕하세요, 최현우입니다.',
//     is_comment_notification: true,
//     is_emoji_notification: true,
//     is_follow_notification: false,
//     is_authorized: true,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'F6F4C',
//   },
//   {
//     id: 7,
//     nickname: '김윤아',
//     profile_image_url: 'https://randomuser.me/api/portraits/women/7.jpg',
//     generation: 2,
//     introduce: '안녕하세요, 김윤아입니다.',
//     is_comment_notification: false,
//     is_emoji_notification: true,
//     is_follow_notification: true,
//     is_authorized: false,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'G5G2H',
//   },
//   {
//     id: 8,
//     nickname: '박예은',
//     profile_image_url: 'https://randomuser.me/api/portraits/women/8.jpg',
//     generation: 4,
//     introduce: '안녕하세요, 박예은입니다.',
//     is_comment_notification: true,
//     is_emoji_notification: false,
//     is_follow_notification: false,
//     is_authorized: false,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'A15A8',
//   },
//   {
//     id: 9,
//     nickname: '이다현',
//     profile_image_url: 'https://randomuser.me/api/portraits/women/9.jpg',
//     generation: 1,
//     introduce: '안녕하세요, 이다현입니다.',
//     is_comment_notification: false,
//     is_emoji_notification: true,
//     is_follow_notification: false,
//     is_authorized: true,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'B16B9',
//   },
//   {
//     id: 10,
//     nickname: '박서아',
//     profile_image_url: 'https://randomuser.me/api/portraits/women/10.jpg',
//     generation: 3,
//     introduce: '안녕하세요, 박서아입니다.',
//     is_comment_notification: true,
//     is_emoji_notification: false,
//     is_follow_notification: true,
//     is_authorized: true,
//     deleted_at: null,
//     created_at: '2024-04-26T00:00:00Z',
//     updated_at: '2024-04-26T00:00:00Z',
//     sessionId: 'C17C0',
//   },
// ];

// export const followerData: FollowType[] = [
//   {
//     id: 1,
//     image: 'https://picsum.photos/200/300',
//     name: '홍길동',
//     generation: 1,
//   },
//   {
//     id: 2,
//     image: 'https://picsum.photos/200/300',
//     name: '김철수',
//     generation: 2,
//   },
//   {
//     id: 3,
//     image: 'https://picsum.photos/200/300',
//     name: '이영희',
//     generation: 5,
//   },
//   {
//     id: 4,
//     image: 'https://picsum.photos/200/300',
//     name: '박민수',
//     generation: 4,
//   },
//   {
//     id: 5,
//     image: 'https://picsum.photos/200/300',
//     name: '정수진',
//     generation: 2,
//   },
//   {
//     id: 6,
//     image: 'https://picsum.photos/200/300',
//     name: '이상호',
//     generation: 6,
//   },
//   {
//     id: 7,
//     image: 'https://picsum.photos/200/300',
//     name: '김영미',
//     generation: 3,
//   },
//   {
//     id: 8,
//     image: 'https://picsum.photos/200/300',
//     name: '장호영',
//     generation: 2,
//   },
//   {
//     id: 9,
//     image: 'https://picsum.photos/200/300',
//     name: '서지우',
//     generation: 5,
//   },
//   {
//     id: 10,
//     image: 'https://picsum.photos/200/300',
//     name: '박준서',
//     generation: 3,
//   },
// ];

// // export const followingData: FollowType[] = [
// //   {
// //     id: 1,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'John Doe',
// //     generation: 1,
// //   },
// //   {
// //     id: 2,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Jane Smith',
// //     generation: 2,
// //   },
// //   {
// //     id: 3,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Alex Johnson',
// //     generation: 3,
// //   },
// //   {
// //     id: 4,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Emma Wilson',
// //     generation: 4,
// //   },
// //   {
// //     id: 5,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Michael Brown',
// //     generation: 5,
// //   },
// //   {
// //     id: 6,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Sarah Davis',
// //     generation: 6,
// //   },
// //   {
// //     id: 7,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'William Miller',
// //     generation: 1,
// //   },
// //   {
// //     id: 8,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Olivia Garcia',
// //     generation: 2,
// //   },
// //   {
// //     id: 9,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Daniel Martinez',
// //     generation: 3,
// //   },
// //   {
// //     id: 10,
// //     image: 'https://picsum.photos/200/300',
// //     name: 'Sophia Hernandez',
// //     generation: 4,
// //   },
// // ];
