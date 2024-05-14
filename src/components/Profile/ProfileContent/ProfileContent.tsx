import ScrapList from '@/components/Common/ScrapList';
import MyFeedList from '../MyFeedList';
import MyPostList from '../MyPostList';
import { ContainerOptionType } from '@/@types/type';
import { FeedDetailType, FeedListType } from '@/components/Feed/types';
import { PostListType } from '@/components/Post/types';
import { MemberDataType } from '@/pages/profile/types';

interface ProfileContentProps {
  selectedOption: ContainerOptionType;
  myFeedList: FeedListType;
  myPostList: PostListType;
  memberData: MemberDataType;
}
export default function ProfileContent({
  selectedOption,
  myFeedList,
  myPostList,
  memberData,
}: ProfileContentProps) {
  switch (selectedOption) {
    case 'feed':
      return myFeedList ? (
        <MyFeedList feedList={myFeedList} memberData={memberData} />
      ) : (
        '피드가 없습니다.'
      );
    case 'post':
      return myPostList ? (
        <MyPostList postList={myPostList} memberData={memberData} />
      ) : (
        '포스트가 없습니다.'
      );

    case 'scrap':
      return <ScrapList />;
    default:
      return null;
  }
}
