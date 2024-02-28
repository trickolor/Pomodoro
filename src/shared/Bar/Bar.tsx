import React from 'react';
import styles from './bar.css';
import { useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { TSettingsState } from '../redux_store/settings_reducer';

export interface IBarProps {
  value: number;
  isSelected: boolean;
  onClick: () => void;
}

export function Bar({ value, isSelected, onClick }: IBarProps) {
  const { work, pauseShort } = useSelector<TCombinedState, TSettingsState>(state => state.settings);

  const height = ((340 / 4) / (work * 60 + pauseShort * 60)) * value;

  return (
    <div
      className={(!value) ? styles.barNull : (isSelected ? styles.barSelected : styles.bar)}
      style={{ height: `${(!value || value < 5) ? '5' : (height < 420 ? height : 420)}px` }}
      onClick={onClick}
    />
  );
}
