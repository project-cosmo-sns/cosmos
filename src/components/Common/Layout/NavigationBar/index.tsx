import styles from './NavigationBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import SearchInput from '../../SearchInput';

const cn = classNames.bind(styles);

export default function NavigaionBar() {
  return (
    <div className={cn('navigaionBar-container')}>
      <Link href="/">
        <Image src="icon/logo.svg" alt="logo" width={100} height={15} />
      </Link>
      <div className={cn('input-wrapper')}>
        <SearchInput />
      </div>
    </div>
  );
}
