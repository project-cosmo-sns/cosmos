import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';

interface TableRowProps {
  children: React.ReactNode;
}

const cn = classNames.bind(styles);

export default function TableRow({
  children,
}: TableRowProps): React.ReactElement {
  return <div className={cn('list')}>{children}</div>;
}
