import styles from './SideBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';

const cn = classNames.bind(styles);
export default function SideBar() {
  return (
    <div className={cn('container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <Image src="/images/HomeIcon.svg" alt="Home" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src="/images/Plus.svg" alt="Home" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src="/images/Notify.svg" alt="Home" width={24} height={24} />
        </Link>
        <Image src="/images/Follow.svg" alt="Home" width={24} height={24} />
      </div>
    </div>
  );
}
