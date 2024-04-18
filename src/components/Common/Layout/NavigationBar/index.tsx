import styles from './NavigationBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import SearchInput from '@/components/Common/SearchInput';
// import {LogoIcon} from '@/components/Common/IconCollection';

const cn = classNames.bind(styles);

export default function NavigaionBar() {
  return (
    <div className={cn('navigaionBar-container')}>
      <Link href="/">
        <Image src="images/logo.svg" alt="logo" width={100} height={15} />
      </Link>
      <SearchInput />
    </div>
  );
}
