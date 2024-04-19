import * as Icon from '@/components/Common/IconCollection';
import ContentContainer from '@/components/Common/ContentContainer';
import PostList from '@/components/Post/PostList';
import { useState } from 'react';
import FeedCardList from '@/components/Feed/FeedCardList';

export default function TestPage() {
  const [selectedOption, setSelectedOption] = useState<
    'feed' | 'post' | 'scrap'
  >('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');
  return (
    <div>
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      >
        {selectedOption === 'feed' ? (
          <FeedCardList />
        ) : (
          <PostList selectedSort={selectedSort} />
        )}
      </ContentContainer>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
        }}
      >
        {/* <Icon.AddIcon fill="#511264" />
          <Icon.AddImageIcon />
          <Icon.BackIcon />
          <Icon.BellIcon />
          <Icon.CameraIcon />
          <Icon.CheckIcon />
          <Icon.CloseIcon />
          <Icon.CommentIcon />
          <Icon.DeleteIcon />
          <Icon.DoubleLeftIcon />
          <Icon.DoubleRightIcon />
          <Icon.DownIcon />
          <Icon.EditIcon />
          <Icon.EmojiIcon />
          <Icon.EyeIcon />
          <Icon.FeedIcon />
          <Icon.FollowedIcon />
          <Icon.FollowingIcon />
          <Icon.GlassIcon />
          <Icon.HomeIcon />
          <Icon.KebabIcon />
          <Icon.LeftIcon />
          <Icon.LikeIcon />
          <Icon.LikedIcon />
          <Icon.LinkIcon />
          <Icon.PostIcon />
          <Icon.RightIcon />
          <Icon.ScrapIcon />
          <Icon.ScrapedIcon />
          <Icon.SettingIcon />
          <Icon.ShareIcon />
          <Icon.UpIcon />
          <Icon.UserIcon />
          <Icon.XIcon /> */}
      </div>
    </div>
  );
}
