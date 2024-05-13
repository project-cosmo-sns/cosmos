import classNames from 'classnames/bind';
import styles from './EmptyContent.module.scss';
import { ContainerOptionType } from '@/@types/type';
import { ContentContainerProps } from '@/components/Common/ContentContainer';

const cn = classNames.bind(styles);
export default function EmptyContent({
  selectedOption,
}: {
  selectedOption: ContainerOptionType;
}) {
  switch (selectedOption) {
    case 'feed':
      return <div className={cn('empty-content')}>피드가 없습니다.</div>;
    case 'post':
      return <div className={cn('empty-content')}>포스트가 없습니다.</div>;
    case 'scrap':
      return <div className={cn('empty-content')}>스크랩이 없습니다.</div>;
    default:
      return null;
  }
}
