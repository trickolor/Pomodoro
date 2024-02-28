import React from 'react';
import styles from './todayhours.css';
import { useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { timeString } from '../../utils/timeString';

export function TodayHours() {
  const seconds = useSelector<TCombinedState, number>(state => state.stats.displayDay.totalUse);

  const WeekDays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ];

  const date = new Date();
  const currentWeekDay = date.getDay();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{WeekDays[currentWeekDay - 1]}</h2>

      {!seconds &&
        <span className={styles.noSeconds}>
          Нет данных
        </span>
      }

      {!!seconds &&
        <p className={styles.paragraph}>
          Вы работали над задачами в течении <span className={styles.time}>{seconds ? timeString(seconds, false) : ''}</span>
        </p>
      }
    </div>
  );
}
