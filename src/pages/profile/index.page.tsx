import { useEffect, useState } from 'react';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileEditModal from '@/components/Profile/ProfileEditModal';
import { MemberDataType, memberMockData } from '@/pages/profile/mockData';
import Home from '../index.page';

export default function MemberDataContainer() {
  const [memberData, setMemberData] = useState<MemberDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMemberData(memberMockData);
  }, []);

  return (
    <div>
      {memberData && (
        <>
          <ProfileHeader
            memberData={memberData}
            setIsModalOpen={setIsModalOpen}
          />
          <ProfileEditModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            memberData={memberData}
          />
        </>
      )}
      <Home />
    </div>
  );
}
