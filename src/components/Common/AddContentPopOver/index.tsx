import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import Image from 'next/image';
import PopOver from '../PopOverBox';

type PopOverProps = {
  popOverRef: React.RefObject<HTMLUListElement>;
  items: string[];
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({ items, popOverRef }: PopOverProps) {
  return (
    <PopOver>
      <div className={cn('container')}>
        {items.map((item, index) => (
          <p key={index} className={cn('content-list')}>
            {item}
            <Image src="/icon/right.svg" alt="right" width={24} height={24} />
          </p>
        ))}
      </div>
    </PopOver>
  );
}
