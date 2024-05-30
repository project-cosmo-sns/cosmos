import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';

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
  generation?: number;
  name: string;
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

export type InfiniteDataRefetchType<T> = (
  options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<InfiniteData<T, unknown>, Error>>;

export type refetchType<T> = (
  options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<T, Error>>;
