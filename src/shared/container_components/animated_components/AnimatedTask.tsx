import React from 'react';
import styles from './task.css';
import { TaskMenu } from '../../TaskMenu';
import { TCombinedState } from '../../redux_store/store';
import { DELETE_TASK, EDIT_TASK_NAME, TASK_COMPLETE_ANIMATION_FLAG, TASK_CONTAINER_ANIMATION_FLAG, TOGGLE_EDIT_MODE, TTask } from '../../redux_store/tasks_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useDispatchAll } from '../../../hooks/useDisaptchAll';
import { CHANGE_TASK_INPUT_VALUE } from '../../redux_store/input_reducer';
import { DeleteConfirm } from '../../DeleteConfirm';
import { ModalAnimation } from './ModalAnimation';
import { Animation, TTweenPreset } from '../../Animation';
import { TTimeStep, CHANGE_TIMER_TYPE, REMOVE_TIME_STEP, PATCH_TIME_STEPS } from '../../redux_store/timer_reducer';

export interface ITaskProps {
  taskName: string;
  taskOrder: number;
  quantity: number;
}

export function AnimatedTask({ taskOrder, quantity, taskName }: ITaskProps) {
  const dispatch = useDispatch();

  const taskInputValue = useSelector<TCombinedState, string>(state => state.input.taskInputValue);

  const { deleteConfirm, editMode, animationFlags } = useSelector<TCombinedState, TTask>(state => state.tasks.all[taskOrder]);
  const taskCount = useSelector<TCombinedState, number>(state => state.tasks.all.length);

  const timerQueue = useSelector<TCombinedState, TTimeStep[]>(state => state.timer.timerQueue);
  const currentTimeQueueLength = timerQueue.filter(i => i.taskOrder === taskOrder).length;

  const MountTweens: TTweenPreset[] = [
    {
      method: 'set',
      animateChildren: true,
      keyframes: { opacity: 0 }
    },
    {
      method: 'fromTo',
      animateChildren: false,
      keyframes: { from: { scaleY: 0 }, to: { scaleY: 1, duration: 0.6 } }
    },
    {
      method: 'to',
      animateChildren: true,
      keyframes: { opacity: 1, delay: 0.6 },
      callback: () => dispatch(TASK_CONTAINER_ANIMATION_FLAG(taskOrder, true))
    }
  ]

  const CompleteTweens: TTweenPreset[] = [
    {
      method: 'to',
      animateChildren: true,
      keyframes: { opacity: 0, duration: 0.6 }
    },
    {
      method: 'to',
      animateChildren: false,
      keyframes: { scaleY: 0, delay: 0.6, marginTop: -55, duration: 1 },
      callback: () => {
        if (!animationFlags.complete) return;

        useDispatchAll(dispatch, [TASK_COMPLETE_ANIMATION_FLAG(taskOrder, false), CHANGE_TIMER_TYPE(taskCount > 1 ? 'ready' : 'empty')]);

        for (let i = 0; i < currentTimeQueueLength; ++i) {
          dispatch(REMOVE_TIME_STEP(taskOrder, true));
        }

        useDispatchAll(dispatch, [(DELETE_TASK(taskOrder)), (PATCH_TIME_STEPS(taskOrder))])
      }
    }
  ]

  const condition = animationFlags.complete ? animationFlags.complete : !animationFlags.container;

  return (
    <Animation
      containerClass={styles.container}
      shouldAnimate={condition}
      tweens={
        animationFlags.complete ?
          CompleteTweens
          : MountTweens
      }
      children={<>
        <div className={styles.circle}>
          < span className={styles.weight} > {quantity}</span >
        </div>

        {
          !editMode &&
          <span className={styles.name}>{taskName}</span>
        }

        {
          editMode &&
          <input
            className={styles.input}
            value={taskInputValue}
            type="text"
            autoFocus={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(CHANGE_TASK_INPUT_VALUE(event.target.value));
            }}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
              event.target.value = taskName;
              event.target.select();
              event.target.click();
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key !== 'Enter') return
              useDispatchAll(dispatch, [TOGGLE_EDIT_MODE(taskOrder), EDIT_TASK_NAME(taskInputValue !== '' ? taskInputValue : taskName, taskOrder)]);
            }}
            onBlur={() => useDispatchAll(dispatch, [TOGGLE_EDIT_MODE(taskOrder), EDIT_TASK_NAME(taskInputValue !== '' ? taskInputValue : taskName, taskOrder)])}
          />
        }

        <TaskMenu taskOrder={taskOrder} />

        {
          deleteConfirm &&
          <ModalAnimation
            children={<DeleteConfirm taskOrder={taskOrder} />}
          />
        }
      </>
      }
    />

  );
}
