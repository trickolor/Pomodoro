import React from 'react';
import styles from './xscale.css';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { TOGGLE_DAY, TStatsState } from '../redux_store/stats_reducer';
import { generateRandomString } from '../../utils/generateRandomString';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { BUFFER_WATCH_DISPLAY_DAY } from '../redux_store/buffer_reducer';

export function XScale() {
  const dispatch = useDispatch();
  const { displayDay, displayWeek } = useSelector<TCombinedState, TStatsState>(state => state.stats);
  const { days } = displayWeek;


  const weekDays = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс"
  ];

  const mappedWeekDays = weekDays.map(
    (day, dayIndex) => {
      return (
        <span key={generateRandomString()} className={weekDays.indexOf(day) === displayDay.dayIndex ? styles.daySelected : styles.day} onClick={() => useDispatchAll(dispatch, [TOGGLE_DAY(dayIndex), BUFFER_WATCH_DISPLAY_DAY(days[dayIndex])])}>
          {day}
        </span>
      )
    }
  );

  return (
    <div className={styles.container}>
      {...mappedWeekDays}
    </div>
  );
}
