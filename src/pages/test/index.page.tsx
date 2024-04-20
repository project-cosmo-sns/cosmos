import * as Icon from '@/components/Common/IconCollection';
import Modal from '@/components/Common/Layout/Modal';
import FollowList from '@/components/Profile/FollowList';
import ContentContainer from '@/components/Common/ContentContainer';
import PostList from '@/components/Post/PostList';
import FeedCardList from '@/components/Feed/FeedCardList';
import { useState } from 'react';
import {
  followerData,
  followingData,
} from '@/components/Profile/FollowList/FollowMockData';

export default function TestPage() {
  const [selectedOption, setSelectedOption] = useState<
    'feed' | 'post' | 'scrap'
  >('feed');
  const [selectedSort, setSelectedSort] = useState<
    'all' | 'followed' | 'myGeneration'
  >('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [followModal, setFollowModal] = useState({
    follower: false,
    following: false,
  });

  const toggleModla = (type: 'follower' | 'following') => {
    setFollowModal({
      ...followModal,
      [type]: !followModal[type],
    });
  };
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
      <div>
        <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
          on/off
        </button>
        {isModalOpen && (
          <Modal
            modalVisible={isModalOpen}
            toggleModal={setIsModalOpen}
            title="피드 생성"
          >
            <div
              style={{
                height: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>모달 컴포넌트</span>
            </div>
          </Modal>
        )}
        <br />
        <button type="button" onClick={() => toggleModla('follower')}>
          팔로워
        </button>
        {followModal.follower && (
          <FollowList
            followListProps={{
              title: '팔로워',
              handleClick: () => toggleModla('follower'),
              followData: followerData,
              isFollow: false,
              modalOpen: followModal.follower,
            }}
          />
        )}
        <br />
        <button type="button" onClick={() => toggleModla('following')}>
          팔로잉
        </button>
        {followModal.following && (
          <FollowList
            followListProps={{
              title: '팔로잉',
              handleClick: () => toggleModla('following'),
              followData: followingData,
              isFollow: true,
              modalOpen: followModal.following,
            }}
          />
        )}
      </div>
    </div>
  );
}
