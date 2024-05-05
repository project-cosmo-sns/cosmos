import { CloseIcon } from '@/components/Common/IconCollection';
import { HashTagType } from '@/components/Post/types';
import classNames from 'classnames/bind';
import styles from './HashTag.module.scss';

interface HashTagProps {
  tag: HashTagType;
  handleClick?: (args: string) => void;
}

export default function HashTag({ tag, handleClick }: HashTagProps) {
  const cn = classNames.bind(styles);

  const { tagName, color } = tag;

  return (
    <div className={cn('wrapper', color)}>
      # {tagName}
      {handleClick && (
        <CloseIcon
          width="10"
          height="10"
          onClick={() => handleClick(tagName)}
        />
      )}
    </div>
  );
}
