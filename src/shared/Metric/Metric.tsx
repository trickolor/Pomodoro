import React from 'react';
import styles from './metric.css';
import { Icon } from '../Icon';
import { useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { TDay } from '../redux_store/stats_reducer';

interface IMetricProps {
  type: 'focus' | 'pause' | 'stop';
}

export function Metric({ type }: IMetricProps) {

  const day = useSelector<TCombinedState, TDay>(state => state.stats.displayDay);

  const metricClasses = {
    'focus': styles.containerFocus,
    'pause': styles.containerPause,
    'stop': styles.containerStop
  }

  const metricIcons = {
    'focus': <Icon name='Focus' />,
    'pause': <Icon name='Clock' />,
    'stop': <Icon name='Stop' />,
  }

  const metricTitles = {
    'focus': 'Фокус',
    'pause': 'Время на паузе',
    'stop': 'Остановки'
  }

  const metricValues = {
    'focus': day.totalUse ? ((day.totalUse / (day.stopTime + day.totalUse)) * 100).toFixed(0) + '%' : '0%',
    'pause': !day.stopTime ? '0 м' : (day.stopTime > 60 ? Math.floor(day.stopTime / 60) + 'м' : day.stopTime + 'сек'),
    'stop': `${day.stopCount}`
  }

  return (
    <div className={!Number(metricValues[type].charAt(0)) ? styles.containerNull : metricClasses[type]}>
      <div className={styles.textBox}>
        <h2 className={styles.title}>
          {metricTitles[type]}
        </h2>
        <span className={styles.value}>
          {metricValues[type]}
        </span>
      </div>

      <div className={!Number(metricValues[type].charAt(0)) ? styles.iconContainerNull : styles.iconContainer}>
        {metricIcons[type]}
      </div>
    </div>
  );
}
