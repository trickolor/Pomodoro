import React from 'react';
import styles from './chart.css';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { TDay, TOGGLE_DAY, TStatsState } from '../redux_store/stats_reducer';
import { generateRandomString } from '../../utils/generateRandomString';
import { AnimatedBar } from '../container_components/animated_components/AnimatedBar';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { BUFFER_WATCH_DISPLAY_DAY } from '../redux_store/buffer_reducer';


export function Chart() {
  const dispatch = useDispatch();
  const { displayDay, displayWeek } = useSelector<TCombinedState, TStatsState>(state => state.stats);

  const { days } = displayWeek;
  const { date } = displayDay;

  const steps = [];
  for (let i = 0; i < 4; ++i) {
    steps.push(
      <span className={styles.step} style={{ bottom: `${(340 / 4) * (i + 1)}px` }} />
    )
  }

  const bars = days.map(
    (day: TDay, dayIndex: number) => <AnimatedBar value={day.totalUse} isSelected={day.date === date ? true : false} key={generateRandomString()} onClick={() => useDispatchAll(dispatch, [TOGGLE_DAY(dayIndex), BUFFER_WATCH_DISPLAY_DAY(days[dayIndex])])} />
  )

  return (
    <div className={styles.container}>
      {...steps}
      {...bars}
    </div>
  );
}
