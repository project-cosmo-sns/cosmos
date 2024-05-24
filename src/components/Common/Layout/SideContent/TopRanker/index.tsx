import SideContent from '../index';
import { ProfileIcon } from '@/components/Common/IconCollection';
import GenerationBadge from '@/components/Common/GenerationBadge';
import styles from './TopRanker.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function TopRanker() {
  return (
    <SideContent text="🏆이번주 Top 10🏆">
      <div className={cn('topRanker-container')}>
        <span>1</span>
        <ProfileIcon width="24px" height="24px" />
        <span>박지용</span>
        <GenerationBadge generationInfo={3} />
      </div>
    </SideContent>
  );
}
