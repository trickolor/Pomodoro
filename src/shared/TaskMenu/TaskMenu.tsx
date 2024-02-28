import React, { useRef } from 'react';
import styles from './taskmenu.css';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IItemProps, List } from '../List';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { TOGGLE_DELETE_CONFIRM, TOGGLE_EDIT_MODE, TOGGLE_MENU_OPEN, TTask } from '../redux_store/tasks_reducer';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { ADD_TIME_STEP, REMOVE_TIME_STEP, TTimeStep } from '../redux_store/timer_reducer';
import { TFormValues } from '../Settings';

interface TaskMenuProps {
  taskOrder: number;
}

export function TaskMenu({ taskOrder }: TaskMenuProps) {
  const dispatch = useDispatch();
  const { menuOpen } = useSelector<TCombinedState, TTask>((state) => state.tasks.all[taskOrder]);

  const timerQueue = useSelector<TCombinedState, TTimeStep[]>(state => state.timer.timerQueue);
  const currentTimeQueueLength = timerQueue.filter(i => i.taskOrder === taskOrder).length;

  const values = useSelector<TCombinedState, TFormValues>(state => state.settings);

  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef, () => dispatch(TOGGLE_MENU_OPEN(taskOrder)), buttonRef);

  const list: IItemProps[] = [
    {
      As: 'li',
      className: styles.listItem,
      children: <Icon name='Add' />,
      text: 'Увеличить',
      onClick: () => dispatch(ADD_TIME_STEP(taskOrder, values))
    },
    {
      As: 'li',
      className: styles.listItem,
      children: <Icon name='Subtract' />,
      text: 'Уменьшить',
      onClick: () => {
        if (currentTimeQueueLength <= 1) return;

        dispatch(REMOVE_TIME_STEP(taskOrder, true));
      }
    },
    {
      As: 'li',
      className: styles.listItem,
      children: <Icon name='Edit' />,
      text: 'Редактировать',
      onClick: () => useDispatchAll(dispatch, [TOGGLE_EDIT_MODE(taskOrder), TOGGLE_MENU_OPEN(taskOrder)])
    },
    {
      As: 'li',
      className: styles.listItem,
      children: <Icon name='Delete' />,
      text: 'Удалить',
      onClick: () => useDispatchAll(dispatch, [TOGGLE_DELETE_CONFIRM(taskOrder), TOGGLE_MENU_OPEN(taskOrder)])
    }
  ];

  return (
    <>
      <div className={styles.buttonContainer} ref={buttonRef}>
        <Button
          className={styles.button}
          callback={() => {
            dispatch(TOGGLE_MENU_OPEN(taskOrder));
          }}
          children={<Icon name='Menu' />}
        />
      </div>

      {menuOpen &&
        <div className={styles.listContainer} ref={menuRef}>
          <List As='ul' items={list} className={styles.list} />
        </div>
      }
    </>
  );
}
