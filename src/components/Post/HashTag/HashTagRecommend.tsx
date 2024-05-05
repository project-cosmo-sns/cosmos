import classNames from 'classnames/bind';
import { HashTagType } from '../types';
import styles from './HashTagRecommendProps.module.scss';

interface HashTagRecommendProps {
  hashTagList: HashTagType[];
  setTagValue: (args: string) => void;
  handleAddHashtag: ({
    event,
    name,
    color,
  }: {
    event?: React.KeyboardEvent<HTMLInputElement>;
    name?: string;
    color?: string;
  }) => void;
}

const cn = classNames.bind(styles);

export default function HashTagRecommend({
  hashTagList,
  setTagValue,
  handleAddHashtag,
}: HashTagRecommendProps) {
  return (
    <div className={cn('wrapper')}>
      {hashTagList.map((hashTag) => (
        <div
          key={hashTag.tagName}
          className={cn('hashtag-container')}
          onClick={() => {
            setTagValue(hashTag.tagName);
            handleAddHashtag({ name: hashTag.tagName, color: hashTag.color });
          }}
        >
          # {hashTag.tagName}
        </div>
      ))}
    </div>
  );
}
