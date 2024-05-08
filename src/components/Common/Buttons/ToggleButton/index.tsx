import React, { useState } from 'react';
import styles from './ToggleButton.module.scss';
import classNames from 'classnames/bind';

interface ToggleButtonProps {
  setting: boolean | undefined;
}

const cn = classNames.bind(styles);

export default function ToggleButton({ setting }: ToggleButtonProps) {
  const [isChecked, setIsChecked] = useState(setting);

  const toggleHandler = () => {
    setIsChecked(!isChecked);
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
