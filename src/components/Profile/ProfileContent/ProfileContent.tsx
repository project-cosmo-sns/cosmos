import { ContainerOptionType } from '@/@types/type';
import { FeedListType } from '@/components/Feed/types';
import { PostListType } from '@/components/Post/types';
import { MemberDataType } from '@/pages/profile/types';
import MyFeedList from '../MyFeedList';
import MyPostList from '../MyPostList';
import MyScrapList from '../MyScrapList';
import classNames from 'classnames/bind';
import styles from './EmptyContent.module.scss';

interface ProfileContentProps {
  selectedOption: ContainerOptionType;
  myFeedList: FeedListType;
  myPostList: PostListType;
  myScrapList: PostListType;
  memberData: MemberDataType;
}

const cn = classNames.bind(styles);

export default function ProfileContent({
  selectedOption,
  myFeedList,
  myPostList,
  myScrapList,
  memberData,
}: ProfileContentProps) {
  switch (selectedOption) {
    case 'feed':
      return myFeedList ? (
        <MyFeedList feedList={myFeedList} memberData={memberData} />
      ) : (
        <div className={cn('no-post')}>피드가 없습니다.</div>
      );
    case 'post':
      return myPostList ? (
        <MyPostList postList={myPostList} memberData={memberData} />
      ) : (
        <div className={cn('no-post')}>포스트가 없습니다.</div>
      );

    case 'scrap':
      return myScrapList ? (
        <MyScrapList scrapList={myScrapList} />
      ) : (
        <div className={cn('no-post')}>스크랩 한 게시물이 없습니다.</div>
      );
    default:
      return null;
  }
}
