import React from 'react';
import styles from './tasktimer.css';
import { AnimatedTime } from '../container_components/animated_components/AnimatedTime';
import { useBuffer } from '../../hooks/useBuffer';

export interface ITaskTimer {
  taskName: string;
  isEmpty?: boolean;
  timerColor: 'Red' | 'Yellow' | 'Gray';
  numberColor: 'Red' | 'Yellow' | 'Gray';
  seconds: number;
  currentTimeStepOrder: string;
  firstButton: JSX.Element;
  secondButton: JSX.Element;
}

export function TaskTimer({ taskName, isEmpty, timerColor, seconds, currentTimeStepOrder, firstButton, secondButton, numberColor }: ITaskTimer) {
  const colors = {
    'Yellow': styles.boxTopYellow,
    'Red': styles.boxTopRed,
    'Gray': styles.boxTopGray
  }

  useBuffer();

  return (
    <>
      <div className={colors[timerColor]}>
        <span className={styles.nameTop}>
          {taskName}
        </span>

        <span className={styles.ordinalTop}>
          {currentTimeStepOrder}
        </span>
      </div>

      <div className={styles.boxBottom}>
        <AnimatedTime seconds={seconds} color={numberColor} />

        <div className={styles.textLine}>

          {isEmpty &&
            <span className={styles.spanBottom}>
              Нет активных задач
            </span>
          }

          {!isEmpty &&
            <>
              <span className={styles.spanBottom}>
                Задача -
              </span>
              <span className={styles.nameBottom}>
                {taskName}
              </span>
            </>
          }
        </div>

        <div className={styles.buttonLine}>
          {firstButton}
          {secondButton}
        </div>
      </div>
    </>
  );
}
