import Image from 'next/image';
import classNames from 'classnames';
import { CloseIcon } from '@/components/Common/IconCollection';
import styles from '@/components/Feed/CreateFeed/CreateFeed.module.scss';

const cn = classNames.bind(styles);

interface ImagePreviewProps {
  imagePreview: string[] | null;
  handleDeleteImage: (index: number) => void;
}

function ImagePreview({ imagePreview, handleDeleteImage }: ImagePreviewProps) {
  return (
    <>
      {imagePreview && (
        <div className={cn('preview-box')}>
          {imagePreview.map((item, index) => (
            <div key={index} className={cn('preview-container')}>
              <CloseIcon
                className={cn('close')}
                onClick={() => {
                  handleDeleteImage(index);
                }}
              />
              <div className={cn('preview-wrapper')}>
                <Image
                  fill
                  className={cn('file-preview')}
                  src={item}
                  alt="image_item"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ImagePreview;
