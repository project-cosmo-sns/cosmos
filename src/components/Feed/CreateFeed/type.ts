export interface FeedType {
  content: string;
  feedImage: string[];
}

export interface UrlType {
  uploadURL: string;
}
export interface CreatedFeedTypes {
  profileImage: string | null;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
}

export interface Inputs {
  content: string;
  feedImage: string[];
}
