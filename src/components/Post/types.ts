import { HASH_TAG_COLOR_CODE } from '@/constants/hashTagCode';

export interface WriterType {
  id: number;
  nickname: string;
  generation: number;
  profileImageUrl: string | null;
}

export interface HashTagType {
  tagName: string;
  color: HASH_TAG_COLOR_CODE;
}

export interface HashTagRequestType extends HashTagType {
  hashTagId: number | null;
}

export interface PostRequestType {
  category: string;
  title: string;
  content: string;
  hashTags: HashTagRequestType[];
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
}

export interface PostListInfoType {
  writer: WriterType;
  post: PostType;
}

export interface PostListType {
  data: {
    postListInfo: PostListInfoType;
    postListHashTag: HashTagType[];
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

export type EmojiCode = 'HEART' | 'THUMBSUP' | 'LAUGH' | 'SAD' | 'CHECK' | 'ME';

export interface EmojiType {
  emojiCode: EmojiCode;
  emojiCount: number;
  isClicked: boolean;
}

export interface PostDetailType {
  postDetail: {
    writer: WriterType;
    post: PostType;
    hashTag: HashTagType[];
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
    writer: WriterType;
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
