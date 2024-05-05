export interface WriterType {
  id: string;
  nickname: string;
  generation: number;
  profileImageUrl: string;
}

export interface CommentType {
  writer: WriterType;
  id: number;
  content: string;
  heartCount: number;
  isHearted: boolean;
  createdAt: string;
}

export interface CommentListType {
  data: CommentType[];
  meta: {
    page: number;
    take: number;
    totalCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface HashTagType {
  tagName: string;
  color: string;
}

export interface HashTagRequestType extends HashTagType {
  hashTagId: number | null;
}

export interface PostRequestDataType {
  category: string;
  title: string;
  content: string;
  hashTags: HashTagRequestType[];
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  commentCount: number;
  emojiCount: number;
  createdAt: string;
}

export interface PostDetailType {
  postListInfo: {
    writer: WriterType;
    post: PostType;
  };
  postListHashTag: HashTagType[];
}

export interface PostListDataType {
  data: PostDetailType[];
  meta: {
    page: number;
    take: number;
    totalCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
