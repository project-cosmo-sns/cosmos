import ContentContainer from '@/components/Common/ContentContainer';
import Notification from '@/components/Common/Layout/Notification';
import { useState } from 'react';
import * as Icon from '@/components/Common/IconCollection';

export default function TestPage() {
  const [selectedOption, setSelectedOption] = useState<
    'post' | 'feed' | 'scrap'
  >('feed');

  return (
    <>
      <div
        style={{
          background: '#f3f3f3',
          width: '100%',
          height: '100vh',
          padding: '20px',
        }}
      >
        <Notification />
        <ContentContainer
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isMyProfile
        >
          컨텐츠 내용
        </ContentContainer>
      </div>
      <div
        style={{
          position: 'fixed',
          left: '800px',
          top: '30px',
          padding: '20px',
          border: '1px solid #ccc',
        }}
      >
        <p>
          Sample <br /> <br />
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
          }}
        >
          <Icon.AddIcon fill="#511264" />
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
          <Icon.XIcon />
        </div>
      </div>
    </>
  );
}
