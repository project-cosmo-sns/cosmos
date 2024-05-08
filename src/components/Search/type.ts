import { PostInfoType } from '../Post/types';

export interface Writer {
  id: number;
  nickname: string;
  generation: number | null;
  profileImageUrl: string | null;
}

interface Post {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  commentCount: number;
  emojiCount: number;
  createdAt: string;
}

export interface SearchData {
  writer: Writer;
  post: Post;
}

export interface Meta {
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface SearchResult {
  data: PostInfoType[];
  meta: Meta;
}

export interface Member {
  id: number;
  nickname: string;
  generation: number | null;
  profileImageUrl: string | null;
  introduce: string | null;
  followerCount: number;
  followingCount: number;
  isFollowing: number;
  isMine: boolean;
}

export interface MemberData {
  member: Member;
}

export interface SearchMemberResultData {
  data: MemberData[];
  meta: Meta;
}
