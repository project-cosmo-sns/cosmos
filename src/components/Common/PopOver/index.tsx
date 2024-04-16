import styles from './PopOver.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cn = classNames.bind(styles);

type PopOverProps = {
  items: string[];
  popOverRef: React.RefObject<HTMLUListElement>;
};

export default function PopOver({ items, popOverRef }: PopOverProps) {
  return (
    <ul className={cn('container')} ref={popOverRef}>
      {items.map((item, index) => (
        <li key={index} className={cn('content-list')}>
          {item}
          <Image src="/icon/right.svg" alt="right" width={24} height={24} />
        </li>
      ))}
    </ul>
  );
}