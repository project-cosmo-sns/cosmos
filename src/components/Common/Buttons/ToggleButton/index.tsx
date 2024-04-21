import React, { useState } from 'react';
import styles from './ToggleButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function ToggleButton() {
  const [isChecked, setIsChecked] = useState(false);

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
