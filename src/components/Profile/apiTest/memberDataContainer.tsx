import { useEffect, useState } from 'react';
import ProfileHeader from '../ProfileHeader';
import ProfileEditModal from '../ProfileEditModal';
import { MemberDataType, memberMockData } from '@/pages/profile/mockData';

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
    </div>
  );
}
