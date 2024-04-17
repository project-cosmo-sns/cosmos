import styles from './SideBar.module.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import AddContentPopOver from '../AddContentPopOver';

const cn = classNames.bind(styles);
export default function SideBar() {
  const [isPopOver, setIsPopOver] = useState(false);
  const popOverRef = useRef<HTMLUListElement>(null);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsPopOver(!isPopOver);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popOverRef.current &&
        !popOverRef.current.contains(e.target as Node)
      ) {
        setIsPopOver(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className={cn('container')}>
      <div className={cn('icon-wrapper')}>
        <Link href="/">
          <Image src="/icon/home.svg" alt="home" width={24} height={24} />
        </Link>
        <Image
          src="/icon/purple.svg"
          alt="add"
          width={24}
          height={24}
          onClick={onClick}
        />
        {isPopOver && (
          <AddContentPopOver
            popOverRef={popOverRef}
            items={['피드 작성하기', '포스트 작성하기']}
          />
        )}
        <Image src="/icon/bell.svg" alt="bell" width={24} height={24} />
        <Link href="/profile">
          <Image src="/icon/user.svg" alt="profile" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
}
