import DetailImageModal from '@/components/Common/DetailImageModal';
import { useImageDetail } from '@/hooks/useImageDetail';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

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
      <DetailImageModal
        currentImageUrl={currentImageUrl}
        isImageModalVisible={isImageModalVisible}
        hideImageDetail={hideImageDetail}
      />
    </>
  );
}
