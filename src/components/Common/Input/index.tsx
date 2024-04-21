import classNames from 'classnames/bind';
import styles from './Input.module.scss';

interface InputProps {
  placeholder: string;
}

const cn = classNames.bind(styles);

export default function Input({ placeholder }: InputProps) {
  return (
    <div className={cn('wrapper')}>
      <input
        className={cn('input')}
        type="text"
        name="commentInput"
        placeholder={placeholder}
      />
    </div>
  );
}
