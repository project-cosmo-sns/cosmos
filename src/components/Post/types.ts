import { HASH_TAG_COLOR_CODE } from '@/constants/hashTagCode';
import { Writer } from '../Feed/types';
import { EmojiType } from '@/@types/type';

export interface HashTagType {
  tagName: string;
  color: HASH_TAG_COLOR_CODE;
}

export interface PostRequestType {
  id?: number;
  category: string;
  title: string;
  content: string;
  hashTags: HashTagType[];
}

export interface PostType {
  id: number;
  category: string;
  title: string;
  content: string;
  viewCount: number;
  commentCount: number;
  emojiCount: number;
  createdAt: string;
  isMine: boolean;
}

export interface PostListInfoType {
  writer: Writer;
  post: PostType;
}

export interface PostListDataType {
  postListInfo: PostListInfoType;
  postListHashTag: HashTagType[];
}

export interface PostListType {
  data: PostListDataType[];
  meta: {
    page: number;
    take: number;
    totalCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface PostDetailType {
  postDetail: {
    writer: Writer;
    post: PostType;
    hashTags: HashTagType[];
    emoji: EmojiType[];
  };
}

export interface CommentType {
  id: number;
  content: string;
  heartCount: number;
  isHearted: boolean;
  createdAt: string;
}

export interface PostCommentListType {
  data: {
    writer: Writer;
    comment: CommentType;
  }[];
  meta: {
    page: number;
    take: number;
    totalCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
