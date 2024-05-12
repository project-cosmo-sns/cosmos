import ScrapList from '@/components/Common/ScrapList';
import MyFeedList from '../MyFeedList';
import MyPostList from '../MyPostList';
import { ContainerOptionType } from '@/@types/type';
import { FeedDetailType } from '@/components/Feed/types';
import { PostListType } from '@/components/Post/types';

interface ProfileContentProps {
  selectedOption: ContainerOptionType;
  myFeedList: FeedDetailType[];
  myPostList: PostListType;
}
export default function ProfileContent({
  selectedOption,
  myFeedList,
  myPostList,
}: ProfileContentProps) {
  switch (selectedOption) {
    case 'feed':
      return myFeedList ? (
        <MyFeedList feedList={myFeedList} />
      ) : (
        '피드가 없습니다.'
      );
    case 'post':
      return myPostList ? (
        <MyPostList postList={myPostList} />
      ) : (
        '포스트가 없습니다.'
      );

    case 'scrap':
      return <ScrapList />;
    default:
      return null;
  }
}
