import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';

const cn = classNames.bind(styles);

interface ButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export default function OptionButton({
  label,
  onClick,
  isActive,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('option', { 'active-text': isActive })}
    >
      {label}
    </button>
  );
}
