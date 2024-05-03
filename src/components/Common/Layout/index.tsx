import NavigaionBar from './NavigationBar';
import SideBar from './SideBar';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';

type layoutProps = {
  children: React.ReactNode;
};

const cn = classNames.bind(styles);

export default function Layout({ children }: layoutProps) {
  return (
    <div className={cn('layout-container')}>
      <div className={cn('layout-sideBar')}>
        <SideBar />
      </div>
      <div className={cn('layout-navigaionBar')}>
        <NavigaionBar />
      </div>
      <div className={cn('layout-content')}>{children}</div>
    </div>
  );
}
