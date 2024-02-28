import React from 'react';
import styles from './header.css';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { ThemeToggler } from '../ThemeToggler';
import { useDispatch } from 'react-redux';
import { TOGGLER_FLAG } from '../redux_store/mode_reducer';
import { TOGGLE_SETTINGS_OPEN } from '../redux_store/settings_reducer';

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Icon name='Tomato' />

        <span className={styles.logoText}>
          pomodoro_box
        </span>
      </div>

      <div className={styles.buttonBox}>

        {(typeof window === 'object' && window.location.pathname === '/timer') &&
          <Button className={styles.buttonStats} children={<Icon name='Stats' />} text='Статистика' callback={() => {
            navigate('/stats');
            dispatch(TOGGLER_FLAG(true));
          }} />
        }

        {(typeof window === 'object' && window.location.pathname === '/stats') &&
          <Button className={styles.buttonTimer} children={<Icon name='ClockSmall' />} text='Таймер' callback={() => {
            navigate('/timer');
            dispatch(TOGGLER_FLAG(true));
          }} />
        }

        <Button className={styles.buttonSettings} children={<Icon name='Cog' />} text='Настройки' callback={() => {
          dispatch(TOGGLE_SETTINGS_OPEN());
        }} />

        <ThemeToggler />
      </div>

    </div>
  )
}
