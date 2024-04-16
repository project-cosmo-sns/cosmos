import styles from './NavigationBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';

const cn = classNames.bind(styles);

export default function NavigaionBar() {
  return (
    <div className={cn('container')}>
      <Link href="/">1</Link>
      <div className={cn('input-wrapper')}>
        <input type="text" placeholder="Search" className={styles.search} />
      </div>
    </div>
  );
}