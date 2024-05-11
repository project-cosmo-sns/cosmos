import React, { useState } from 'react';
import styles from './NotificationToggleButton.module.scss';
import classNames from 'classnames/bind';
import { useQueryClient } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';

interface NotificationToggleButtonProps {
  setting: boolean | undefined;
  type: string;
}

const cn = classNames.bind(styles);

export default function ToggleButton({
  setting,
  type,
}: NotificationToggleButtonProps) {
  const [isChecked, setIsChecked] = useState(setting);
  const queryClient = useQueryClient();

  const toggleHandler = async () => {
    setIsChecked((prev) => !prev);
    try {
      await fetchData({
        param: `/notification/setting/${isChecked ? 'reject' : 'accept'}/${type}`,
        method: 'patch',
      });
      queryClient.invalidateQueries({ queryKey: ['notificationSetting'] });
    } catch (error) {
      console.error('알림 설정 변경 실패:', error);
    }
  };

  return (
    <div
      className={cn('toggle', { 'toggle-checked': isChecked })}
      onClick={toggleHandler}
    >
      <div className={cn('toggle-button')} />
    </div>
  );
}
