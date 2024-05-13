import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ProfileDropdown.module.scss';
import * as Icon from '@/components/Common/IconCollection';
import DeleteModal from '../DeleteModal';
import { useDispatch } from 'react-redux';
import { memberLogout } from '@/api/member';
import { logout } from '@/redux/logoutSlice';
import router from 'next/router';

const cn = classNames.bind(styles);

interface ProfileSettingDropdownProps {
  onSetting: () => void;
}

/**
 * @param {Function} onSetting : 설정 버튼 클릭 시 동작할 로직
 */

export type ProfileSettingType = 'EDIT' | 'LOGOUT';

export default function ProfilePopOver({
  onSetting,
}: ProfileSettingDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const ExpandHandler = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setDeleteModal(false);
      setIsExpanded(true);
    }
  };

  const dispatch = useDispatch();

  const memberLogoutClick = async () => {
    const res = await memberLogout();
    dispatch(logout());
    router.push('/');
    setIsExpanded(false); // 모달을 띄운 후 드롭다운 닫기
  };

  return (
    <div className={cn('wrapper')}>
      <Icon.DropDown onClick={ExpandHandler} />

      {isExpanded && (
        <div
          onClick={ExpandHandler}
          className={cn('expanded-dropdown-container')}
          role="button"
          tabIndex={0}
        >
          <div
            onClick={() => {
              onSetting();
              setIsExpanded(false);
            }}
            className={cn('expanded-dropdown-list', { 'first-item': true })}
          >
            <Icon.SettingIcon width="18" height="18" fill="#C2C7D9" />
            프로필 수정
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal(true);
            }}
            className={cn('expanded-dropdown-list', { 'last-item': true })}
          >
            <Icon.LogoutIcon width="18" height="18" fill="#FFFFFF" />
            로그아웃
          </div>
        </div>
      )}
      <DeleteModal
        isDeleteModalOpen={deleteModal}
        setIsDeleteModalOpen={setDeleteModal}
        handleDelete={memberLogoutClick}
        title="로그아웃"
        deleteText="로그아웃"
      />
    </div>
  );
}
