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
  data: SearchData[];
  meta: Meta;
}
