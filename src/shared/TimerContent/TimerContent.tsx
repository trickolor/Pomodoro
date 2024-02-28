import React from 'react';
import styles from './timercontent.css';
import { Instructions } from '../Instructions';
import { Form } from '../Form';
import { TaskList } from '../TaskList';
import { useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { TTimerState, TTimerType } from '../redux_store/timer_reducer';
import { TTask } from '../redux_store/tasks_reducer';
import { EmptyTimer } from '../container_components/timers/EmptyTimer';
import { PauseTimer } from '../container_components/timers/PauseTimer';
import { ReadyTimer } from '../container_components/timers/ReadyTimer';
import { StopPauseTimer } from '../container_components/timers/StopPauseTimer';
import { StopWorkTimer } from '../container_components/timers/StopWorkTimer';
import { WorkTimer } from '../container_components/timers/WorkTimer';
import { timeString } from '../../utils/timeString';
import { NotificationApply } from '../NotificationApply';
import { Settings } from '../Settings';
import { ModalAnimation } from '../container_components/animated_components/ModalAnimation';
import { AnimatedHeader } from '../container_components/animated_components/AnimatedHeader';
import { usePageFixation } from '../../hooks/usePageFixation';
import { useInjection } from '../../hooks/useInjection';

export function TimerContent() {
  const { timerType, timerQueue } = useSelector<TCombinedState, TTimerState>(state => state.timer);
  const tasks = useSelector<TCombinedState, TTask[]>(state => state.tasks.all);
  const settingsOpen = useSelector<TCombinedState, boolean>(state => state.settings.settingsOpen);
  const popupOpen = useSelector<TCombinedState, boolean>(state => state.notification.popupOpen);
  const { permission } = typeof window === 'object' ? Notification : { permission: 'default' };

  usePageFixation();
  useInjection();

  const timerSelect: Record<TTimerType, JSX.Element> = {
    'empty': <EmptyTimer />,
    'ready': <ReadyTimer />,
    'work': <WorkTimer />,
    'pause': <PauseTimer />,
    'stop_work': <StopWorkTimer />,
    'stop_pause': <StopPauseTimer />
  }

  const totalTime = timerQueue.map(i => {
    return (i.workTime > 0 ? i.workTime : 0) + (i.pauseTime > 0 ? i.pauseTime : 0)
  }).reduce((acc, val) => acc + val, 0);

  return (
    <>
      <AnimatedHeader />

      <main className={styles.container}>
        <div className={styles.leftBox}>
          <Instructions />
          <Form />
          <TaskList />
          {!!tasks.length &&
            <span className={styles.timeTotal}>
              {timeString(totalTime, true)}
            </span>}
        </div>

        {timerSelect[timerType]}

        {(popupOpen && permission !== 'granted') &&
          <ModalAnimation children={<NotificationApply />} />}

        {settingsOpen &&
          <ModalAnimation children={<Settings />} />
        }
      </main>
    </>
  );
}
