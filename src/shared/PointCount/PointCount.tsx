import React from 'react';
import styles from './pointcount.css';
import { Icon } from '../Icon';
import { useSelector } from 'react-redux';
import { TDay } from '../redux_store/stats_reducer';
import { TCombinedState } from '../redux_store/store';


export function PointCount() {
  const count = useSelector<TCombinedState, TDay>(state => state.stats.displayDay).weightCount;

  return (
    <div className={styles.container}>
      {!count &&
        <Icon name='TomatoSmile' />
      }

      {!!count &&
        <>
          <div className={styles.graphicCount}>
            <Icon name='Tomato' width={81} height={81} />
            <span className={styles.quantity}>{`х ${count}`}</span>
          </div>

          <div className={styles.textCount}>
            {`${count} помидор`}
          </div>
        </>
      }
    </div>

  );
}
