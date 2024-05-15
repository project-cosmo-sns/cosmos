import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ProfileDropdown.module.scss';
import * as Icon from '@/components/Common/IconCollection';
import DeleteModal from '../DeleteModal';
import { useDispatch } from 'react-redux';
import { memberLogout } from '@/api/member';
import { logout } from '@/redux/logoutSlice';
import router from 'next/router';
import PopOver from '../PopOverBox';

const cn = classNames.bind(styles);

interface PopOverProps {
  onClose: () => void;
  onSetting: () => void;
}

export default function ProfilePopOver({ onClose, onSetting }: PopOverProps) {
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
  };

  return (
    <div className={cn('wrapper')}>
      <Icon.DropDown onClick={ExpandHandler} />
      {isExpanded && (
        <PopOver onClose={onClose}>
          <ul className={cn('expanded-popover-container')}>
            <li
              role="presentation"
              className={cn('content-list', 'profile-edit')}
              onClick={() => {
                onSetting();
              }}
            >
              <div>
                <Icon.SettingIcon width="18" height="18" fill="#C2C7D9" />
                <span>프로필 수정</span>
              </div>
            </li>
            <li
              role="presentation"
              className={cn('content-list', 'loglout')}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModal(true);
              }}
            >
              <Icon.LogoutIcon width="18" height="18" fill="#FFFFFF" />
              로그아웃
            </li>
          </ul>
          <DeleteModal
            isDeleteModalOpen={deleteModal}
            setIsDeleteModalOpen={setDeleteModal}
            handleDelete={memberLogoutClick}
            title="로그아웃"
            deleteText="로그아웃"
          />
        </PopOver>
      )}
    </div>
  );
}
