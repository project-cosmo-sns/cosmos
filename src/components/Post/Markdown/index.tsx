import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from './CodeBlock';
import classNames from 'classnames/bind';
import styles from './Markdown.module.scss';
import Modal from '@/components/Common/Layout/Modal';
import { useImageDetail } from '@/hooks/useImageDetail';

const cn = classNames.bind(styles);

interface MarkdownContentProps {
  className: string;
  content: string;
}

export default function MarkdownContent({
  className,
  content,
}: MarkdownContentProps) {
  const {
    currentImageUrl,
    isImageModalVisible,
    showImageDetail,
    hideImageDetail,
  } = useImageDetail();

  const renderImage = ({ ...props }) => {
    const { src: imageUrl, alt } = props;

    return (
      <img
        style={{ cursor: 'pointer', maxWidth: '100%' }}
        alt={alt}
        {...props}
        onClick={() => showImageDetail(imageUrl)}
      />
    );
  };

  return (
    <>
      <Markdown
        className={className}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: CodeBlock,
          img: renderImage,
        }}
      >
        {content}
      </Markdown>
      <Modal
        modalVisible={isImageModalVisible}
        cssComponentDisplay={cn('modal-container')}
        cssModalSize={cn('modal-wrapper')}
        toggleModal={hideImageDetail}
      >
        <img
          src={currentImageUrl}
          alt="detail"
          style={{
            objectFit: 'contain',
            width: '800px',
            maxHeight: '80vh',
            maxWidth: '80vw',
          }}
        />
      </Modal>
    </>
  );
}
