import classNames from 'classnames/bind';
import styles from './HashTag.module.scss';
import { Tag } from '@/pages/post/[postId]/mockData';

interface HashTagProps {
  tag: Tag;
}

export default function HashTag({ tag }: HashTagProps) {
  const cn = classNames.bind(styles);

  const { name, color } = tag;
  return <div className={cn('wrapper', color)}>{name}</div>;
}
