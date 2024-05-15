// import classNames from 'classnames/bind';
// import { useState } from 'react';
// import styles from './ProfilePopOver.module.scss';
// import * as Icon from '@/components/Common/IconCollection';
// import DeleteModal from '../../../Common/DeleteModal';
// import { useDispatch } from 'react-redux';
// import { memberLogout } from '@/api/member';
// import { logout } from '@/redux/logoutSlice';
// import router from 'next/router';
// import PopOver from '../../../Common/PopOverBox';

// const cn = classNames.bind(styles);

// interface PopOverProps {
//   onClose: () => void;
//   onSetting: () => void;
// }

// export default function ProfilePopOver({ onClose, onSetting }: PopOverProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);

//   const ExpandHandler = () => {
//     if (isExpanded) {
//       setIsExpanded(false);
//     } else {
//       setDeleteModal(false);
//       setIsExpanded(true);
//     }
//   };
//   const dispatch = useDispatch();

//   const memberLogoutClick = async () => {
//     const res = await memberLogout();
//     dispatch(logout());
//     router.push('/');
//   };

//   return (
//     <div className={cn('wrapper')}>
//       <Icon.DropDown onClick={ExpandHandler} />

//       {isExpanded && (
//         <PopOver onClose={onClose}>
//           <ul className={cn('expanded-popover-container')}>
//             <li
//               role="presentation"
//               className={cn('content-list', 'profile-edit')}
//               onClick={(e) => {
//                 onSetting();
//                 e.stopPropagation();
//                 setIsExpanded(false);
//               }}
//             >
//               <Icon.SettingIcon width="18" height="18" fill="#C2C7D9" />
//               <span>프로필 수정</span>
//             </li>
//             <li
//               role="presentation"
//               className={cn('content-list', 'logout')}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setDeleteModal(true);
//               }}
//             >
//               <Icon.LogoutIcon width="18" height="18" fill="#FFFFFF" />
//               로그아웃
//             </li>
//           </ul>
//           <DeleteModal
//             isDeleteModalOpen={deleteModal}
//             setIsDeleteModalOpen={setDeleteModal}
//             handleDelete={memberLogoutClick}
//             title="로그아웃"
//             deleteText="로그아웃"
//           />
//         </PopOver>
//       )}
//     </div>
//   );
// }

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ProfilePopOver.module.scss';
import * as Icon from '@/components/Common/IconCollection';
import DeleteModal from '@/components/Common/DeleteModal';
import { useDispatch } from 'react-redux';
import { memberLogout } from '@/api/member';
import { logout } from '@/redux/logoutSlice';
import router from 'next/router';
import ReactDOM from 'react-dom';

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
  // const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // useEffect(() => {
  //   setPortalElement(
  //     document.getElementById('profile-popover-box') as HTMLElement,
  //   );
  // }, []);

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

  return (
    <div className={cn('wrapper')}>
      <Icon.DropDown onClick={ExpandHandler} />
      {isExpanded &&
        ReactDOM.createPortal(
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
          </div>,
          // portalElement as HTMLElement,
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
