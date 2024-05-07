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
}

export interface EditCommentType {
  editedComment: string;
}
