export type useOutSideClickProps = {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
};

export type CategoryType =
  | '공지사항'
  | '이벤트'
  | '특강'
  | '정보공유'
  | '오늘의 질문';
