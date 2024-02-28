import React from 'react';
import styles from './tasklist.css';
import { useSelector } from 'react-redux';
import { IItemProps, List } from '../List';
import { addKey } from '../../utils/addKey';
import { TTask } from '../redux_store/tasks_reducer';
import { TCombinedState } from '../redux_store/store';
import { TTimeStep } from '../redux_store/timer_reducer';
import { AnimatedTask } from '../container_components/animated_components/AnimatedTask';

export function TaskList() {
  const tasks = useSelector<TCombinedState, TTask[]>(state => state.tasks.all);
  const timerQueue = useSelector<TCombinedState, TTimeStep[]>(state => state.timer.timerQueue);

  const mappedTasks = tasks.map<IItemProps>((task) => {
    return {
      As: 'li',
      className: styles.listItem,
      children: <AnimatedTask taskName={task.name} quantity={timerQueue.filter(i => i.taskOrder === task.taskOrder).length} taskOrder={task.taskOrder} />
    };
  }).map(addKey);

  return (
    <List As='ul' className={styles.list} items={mappedTasks} />
  );
}
