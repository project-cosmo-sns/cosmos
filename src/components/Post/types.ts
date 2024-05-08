import { HASH_TAG_COLOR_CODE } from '@/constants/hashTagCode';
import { Writer } from '../Feed/types';
import { EmojiType, metaType } from '@/@types/type';

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

export interface PostType extends PostRequestType {
  viewCount: number;
  commentCount: number;
  emojiCount: number;
  createdAt: string;
  emojis: EmojiType[];
  isMine: boolean;
}

export interface PostInfoType {
  writer: Writer;
  post: PostType;
}

export interface PostListDataType {
  postListInfo: PostInfoType;
  postListHashTag: HashTagType[];
}

export interface PostListType {
  data: PostListDataType[];
  meta: metaType;
}

export interface PostDetailType {
  postDetail: PostInfoType;
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
  meta: metaType;
}
