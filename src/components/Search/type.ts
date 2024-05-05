export interface Writer {
  id: number;
  nickname: string;
  generation: number | null; // 혹은 generation?: number;
  profileImageUrl: string | null; // 프로필 이미지 URL 혹은 null
}

interface Post {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  commentCount: number;
  emojiCount: number;
  createdAt: string; // 날짜 및 시간 문자열
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
