export type useOutSideClickProps = {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
};

export type ModalPropsType = {
  modalVisible: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};
