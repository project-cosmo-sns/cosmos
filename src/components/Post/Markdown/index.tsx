import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from './CodeBlock';
import { useState } from 'react';
import Modal from '@/components/Common/Layout/Modal';
import classNames from 'classnames/bind';
import styles from './Markdown.module.scss';

interface MarkdownContent {
  className: string;
  content: string;
}

const cn = classNames.bind(styles);

export default function MarkdownContent({
  className,
  content,
}: MarkdownContent) {
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const showImageDetail = (imageUrl: string) => {
    setIsImageModalVisible(true);
    setCurrentImageUrl(imageUrl);
  };

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
        toggleModal={setIsImageModalVisible}
      >
        <img
          src={currentImageUrl}
          alt="detail"
          style={{
            'object-fit': 'contain',
            width: '800px',
            maxHeight: '80vh',
            maxWidth: '80vw',
          }}
        />
      </Modal>
    </>
  );
}
