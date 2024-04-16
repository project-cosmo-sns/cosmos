import FollowButton from '@/components/Common/Buttons/ActiveButton/FollowButton';
import CtaDefault from '@/components/Common/Buttons/CtaDefault/CtaDefault';
import NoticeButton from '@/components/Common/Buttons/NoticeButton/NoticeButton';
import SortDropdown from '@/components/Common/Buttons/SortDropdown/SortDropdown';

export default function ProfilePage() {
  const handleClick = () => {
    console.log('냐냥');
  };

  return (
    <div>
      <FollowButton onClick={handleClick} />
      <CtaDefault
        children="어쩌구"
        type="submit"
        onClick={handleClick}
        size="large"
        color="purple"
      />
      <NoticeButton onClick={handleClick} />
      <SortDropdown />
    </div>
  );
}
