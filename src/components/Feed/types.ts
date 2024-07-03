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
  id: number;
  content: string;
  heartCount: number;
  createdAt: string;
  isHearted: boolean;
  isMine: boolean;
  isReplied?: boolean;
}

export interface CommentDetailType {
  writer: Writer;
  comment: Comment;
}

export interface ReplyDetailType {
  writer: Writer;
  reply: Comment;
}

export interface CommentListType {
  data: CommentDetailType[];
  meta: metaType;
}

export interface ReplyListType {
  data: ReplyDetailType[];
  meta: metaType;
}
