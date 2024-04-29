import { CloseIcon } from '@/components/Common/IconCollection';
import { Tag } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import styles from './HashTag.module.scss';

interface HashTagProps {
  tag: Tag;
  handleClick?: (args: string) => void;
}

export default function HashTag({ tag, handleClick }: HashTagProps) {
  const cn = classNames.bind(styles);

  const { name, color } = tag;
  return (
    <div className={cn('wrapper', color)}>
      {name}
      {handleClick && (
        <CloseIcon width="10" height="10" onClick={() => handleClick(name)} />
      )}
    </div>
  );
}
