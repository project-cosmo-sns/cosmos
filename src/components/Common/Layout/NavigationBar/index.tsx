import styles from './NavigationBar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import SearchInput from '@/components/Common/SearchInput';
import { LogoIcon, MainLogoIcon } from '../../IconCollection';

const cn = classNames.bind(styles);

export default function NavigaionBar() {
  return (
    <div className={cn('navigaionBar-container')}>
      <div className={cn('navigaionBar-wrapper')}>
        <Link href="/?tab=feed">
          <div className={cn('icon-wrapper')}>
            <MainLogoIcon width="30" height="30" />
            <LogoIcon width="105" height="30" />
          </div>
        </Link>
        <SearchInput />
      </div>
    </div>
  );
}
