import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';

interface TableCellProps {
  children: React.ReactNode;
}

const cn = classNames.bind(styles);

export default function TableCell({
  children,
}: TableCellProps): React.ReactElement {
  return <div className={cn('cell')}>{children}</div>;
}
