import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './ProfilePopOver.module.scss';
import * as Icon from '@/components/Common/IconCollection';
import DeleteModal from '@/components/Common/DeleteModal';
import { useDispatch } from 'react-redux';
import { memberLogout } from '@/api/member';
import { logout } from '@/redux/logoutSlice';
import router from 'next/router';
import ReactDOM from 'react-dom';
import { MemberDataType } from '@/pages/profile/types';
import AuthForm from '../../AuthForm';
import { useToast } from '@/hooks/useToast';

const cn = classNames.bind(styles);

interface ProfileSettingDropdownProps {
  onSetting: () => void;
  memberData: MemberDataType;
}

/**
 * @param {Function} onSetting : 설정 버튼 클릭 시 동작할 로직
 */

export type ProfileSettingType = 'EDIT' | 'LOGOUT';

export default function ProfilePopOver({
  onSetting,
  memberData,
}: ProfileSettingDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

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
    router.push('/').then(() => {
      window.location.reload();
    });
  };

  // 케밥 버튼에 팝오버 딱 고정시켜서 붙이기..............ㅠ
  const profilePopoverRef = useRef(null);
  const iconRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isExpanded && profilePopoverRef.current && iconRef.current) {
      const profilePopover = profilePopoverRef.current as HTMLElement;
      const kebabButtonRect = iconRef.current.getBoundingClientRect();
      if (kebabButtonRect) {
        profilePopover.style.position = 'absolute';
        profilePopover.style.top = `${kebabButtonRect.bottom}px`;
        profilePopover.style.left = `${kebabButtonRect.left - 100}px`;
      }
    }
  }, [isExpanded]);
  // isExpanded가 변경될 때마다 실행

  const authFormClick = () => {
    setShowAuthForm(!showAuthForm);
  };

  const { showToastHandler } = useToast();

  return (
    <div className={cn('wrapper')}>
      <div className={cn('icon')} ref={iconRef} onClick={ExpandHandler}>
        <Icon.DropDown />
      </div>
      {isExpanded &&
        ReactDOM.createPortal(
          <ul
            ref={profilePopoverRef}
            onClick={ExpandHandler}
            className={cn('expanded-dropdown-container')}
            role="presentation"
          >
            {memberData.authorizationStatus === 'ACCEPT' && (
              <li
                onClick={() => {
                  onSetting();
                  setIsExpanded(false);
                }}
                className={cn('expanded-dropdown-list', 'profile-edit')}
              >
                <Icon.SettingIcon width="18" height="18" fill="#C2C7D9" />
                프로필 수정
              </li>
            )}
            {memberData.authorizationStatus === 'PENDING' && (
              <>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    // 토스트!
                    showToastHandler('인증 대기중입니다.', 'warn');
                  }}
                  className={cn('expanded-dropdown-list', 'profile-edit')}
                >
                  <Icon.Certification width="18" height="18" />
                  인증하기
                </li>
                <AuthForm
                  modalVisible={showAuthForm}
                  toggleModal={authFormClick}
                />
              </>
            )}
            {memberData.authorizationStatus === 'NONE' && (
              <>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    authFormClick();
                  }}
                  className={cn('expanded-dropdown-list', 'profile-edit')}
                >
                  <Icon.Certification width="18" height="18" />
                  인증하기
                </li>
                <AuthForm
                  modalVisible={showAuthForm}
                  toggleModal={authFormClick}
                />
              </>
            )}

            <li
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModal(true);
              }}
              className={cn('expanded-dropdown-list', 'logout')}
            >
              <Icon.LogoutIcon width="18" height="18" fill="#FFFFFF" />
              로그아웃
            </li>
          </ul>,
          document.getElementById('profile-popover-box') as HTMLElement,
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
