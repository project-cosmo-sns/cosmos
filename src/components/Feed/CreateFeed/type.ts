import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface FeedType {
  content: string;
  feedImage: string[];
}

export interface UrlType {
  uploadURL: string;
}
export interface CreatedFeedTypes {
  profileImage: string | null;
  modalVisible: boolean;
}

export interface FeedFormController {
  content: string;
  feedImage: string[];
}

export interface FeedTextAreaTypes {
  errors: FieldErrors<FeedFormController>;
  register: UseFormRegister<FeedFormController>;
  watch: UseFormWatch<FeedFormController>;
}

export interface FeedImageInputTypes {
  FeedImageInputProps: {
    images: Blob[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<FeedFormController, any>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview: string[];
    handleDeleteImage: (index: number) => void;
  };
}
