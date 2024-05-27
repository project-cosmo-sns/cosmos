import NavigaionBar from './NavigationBar';
import SideBar from './SideBar';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import HotPost from './SideContent/HotPost';
import TopRanker from './SideContent/TopRanker';

type layoutProps = {
  children: React.ReactNode;
};

const cn = classNames.bind(styles);

export default function Layout({ children }: layoutProps) {
  return (
    <div className={cn('layout-container')}>
      <div className={cn('layout-sideBar')}>
        <SideBar />
        <div id="popover-box" className={cn('popover-box')} />
      </div>
      <div className={cn('layout-navigaionBar')}>
        <NavigaionBar />
      </div>
      <div className={cn('layout-main-content')}>{children}</div>
      <div className={cn('layout-side-content')}>
        <TopRanker />
        <HotPost />
      </div>
    </div>
  );
}
