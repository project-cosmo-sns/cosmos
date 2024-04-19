import Modal from '@/components/Common/Layout/Modal';
import { useState } from 'react';

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
        on/off
      </button>
      {isModalOpen && (
        <Modal
          currentValue={isModalOpen}
          handleClick={setIsModalOpen}
          title="피드 생성"
        >
          <div
            style={{
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span>모달 컴포넌트</span>
          </div>
        </Modal>
      )}
    </div>
  );
}
