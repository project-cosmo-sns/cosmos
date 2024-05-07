import classNames from 'classnames/bind';
import { HashTagType } from '../types';
import styles from './HashTagRecommendProps.module.scss';
import { HASH_TAG_COLOR_CODE } from '@/constants/hashTagCode';

interface HashTagRecommendProps {
  className: string;
  hashTagList: HashTagType[];
  setTagValue: (args: string) => void;
  handleAddHashtag: ({
    event,
    name,
    colorCode,
  }: {
    event?: React.KeyboardEvent<HTMLInputElement>;
    name?: string;
    colorCode?: HASH_TAG_COLOR_CODE;
  }) => void;
}

const cn = classNames.bind(styles);

export default function HashTagRecommend({
  className,
  hashTagList,
  setTagValue,
  handleAddHashtag,
}: HashTagRecommendProps) {
  return (
    <div className={cn('wrapper', className)}>
      {hashTagList.map((hashTag) => (
        <div
          key={hashTag.tagName}
          className={cn('hashtag-container')}
          onClick={() => {
            setTagValue(hashTag.tagName);
            handleAddHashtag({
              name: hashTag.tagName,
              colorCode: hashTag.color,
            });
          }}
        >
          # {hashTag.tagName}
        </div>
      ))}
    </div>
  );
}
