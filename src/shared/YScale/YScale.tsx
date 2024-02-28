import React from 'react';
import styles from './yscale.css';
import { timeString } from '../../utils/timeString';
import { useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { TSettingsState } from '../redux_store/settings_reducer';

export function YScale() {
  const { work, pauseShort } = useSelector<TCombinedState, TSettingsState>(state => state.settings);

  const points = [];
  for (let i = 0; i < 4; ++i) {
    points.push(
      <span className={styles.point} style={{ bottom: `${((340 / 4) * (i + 1)) - 16}px` }}>
        {timeString((work * 60 + pauseShort * 60) * (i + 1), true)}
      </span>
    )
  }

  return (
    <div className={styles.container}>
      {...points}
    </div>
  );
}
