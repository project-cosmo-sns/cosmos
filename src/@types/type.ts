export type useOutSideClickProps = {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
};

export type ModalPropsType = {
  modalVisible: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ContainerOptionType =
  | 'feed'
  | 'post'
  | 'scrap'
  | 'hashtag'
  | 'user';

export interface AuthFormProps {
  generation: string;
  image: string;
  introduce?: string;
}

export interface EditCommentType {
  editedComment: string;
}

export type EmojiCode = 'HEART' | 'THUMBSUP' | 'LAUGH' | 'SAD' | 'CHECK' | 'ME';

export interface EmojiType {
  emojiCode: EmojiCode;
  emojiCount: number;
  isClicked: boolean;
}

export type metaType = {
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
