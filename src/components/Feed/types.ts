import { EmojiType, metaType } from '@/@types/type';

export interface Writer {
  id: number;
  nickname: string;
  generation: number;
  profileImageUrl: string;
}

export interface Feed {
  id: number;
  content: string;
  viewCount: number;
  commentCount: number;
  emojiCount: number;
  createdAt: string;
  imageUrls: string[];
  isMine: boolean;
  emojis: EmojiType[];
}

export interface FeedDetailType {
  writer: Writer;
  feed: Feed;
}

export interface FeedListType {
  data: FeedDetailType[];
  meta: metaType;
}

export interface Comment {
  content: string;
  createdAt: string;
  heartCount: number;
  id: number;
  isHearted: boolean;
  isMine: boolean;
}

export interface CommentDetailType {
  writer: Writer;
  comment: Comment;
}

export interface CommentListType {
  data: CommentDetailType[];
  meta: metaType;
}
