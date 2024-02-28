import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import styles from '../TaskTimer/tasktimer.css';
import React from "react";
import { CHANGE_TIMER_TYPE, REMOVE_TIME_STEP } from "../redux_store/timer_reducer";
import { useDispatchAll } from "../../hooks/useDisaptchAll";
import { INCREASE_STOP_COUNT, INCREASE_POINT_COUNT } from "../redux_store/stats_reducer";
import { TASK_COMPLETE_ANIMATION_FLAG } from "../redux_store/tasks_reducer";
import { TCombinedState } from "../redux_store/store";

export function EmptyFirstButton() {
    return <Button
        className={styles.disabledButton}
        text='Старт'
    />
}

export function EmptySecondButton() {
    return <Button
        className={styles.disabledButton}
        text='Стоп'
    />
}

export function ReadyFirstButton({ task }: { task: number }) {
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);
    const dispatch = useDispatch();

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.firstButton}
        text='Старт'
        callback={() => dispatch(CHANGE_TIMER_TYPE('work'))}
    />
}

export function ReadySecondButton({ task }: { task: number }) {
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);
    return <Button
        className={deletionFlag ? styles.disabledButton : styles.disabledButton}
        text='Стоп'
    />
}

export function WorkFirstButton({ task }: { task: number }) {
    const dispatch = useDispatch();
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.firstButton}
        text='Пауза'
        callback={() => useDispatchAll(dispatch, [CHANGE_TIMER_TYPE('stop_work'), INCREASE_STOP_COUNT()])}
    />
}

export function WorkSecondButton({ length, task }: { length: number, task: number }) {
    const dispatch = useDispatch();
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.secondButton}
        text='Cтоп'
        callback={() => {
            if (length <= 1) {
                dispatch(TASK_COMPLETE_ANIMATION_FLAG(task, true));
                return;
            }

            useDispatchAll(dispatch, [REMOVE_TIME_STEP(task, false), CHANGE_TIMER_TYPE('ready')])
        }}
    />
}

export function StopWorkFirstButton({ task }: { task: number }) {
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);
    const dispatch = useDispatch();

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.firstButton}
        text='Продолжить'
        callback={() => (dispatch(CHANGE_TIMER_TYPE('work')))}
    />
}

export function StopWorkSecondButton({ length, task }: { length: number, task: number }) {
    const dispatch = useDispatch();
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.secondButton}
        text='Сделано'
        callback={() => {
            if (length <= 1) {
                useDispatchAll(dispatch, [TASK_COMPLETE_ANIMATION_FLAG(task, true), INCREASE_POINT_COUNT()]);
                return;
            }

            useDispatchAll(dispatch, [REMOVE_TIME_STEP(task, false), INCREASE_POINT_COUNT(), CHANGE_TIMER_TYPE('ready')])
        }}
    />
}

export function PauseFirstButton({ task }: { task: number }) {
    const dispatch = useDispatch();
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.firstButton}
        text='Пауза'
        callback={() => useDispatchAll(dispatch, [CHANGE_TIMER_TYPE('stop_pause'), INCREASE_STOP_COUNT()])}
    />
}

export function PauseSecondButton({ length, task }: { length: number, task: number }) {
    const dispatch = useDispatch();
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.secondButton}
        text='Пропустить'
        callback={() => {
            if (length <= 1) {
                useDispatchAll(dispatch, [TASK_COMPLETE_ANIMATION_FLAG(task, true), INCREASE_POINT_COUNT()]);
                return;
            }

            useDispatchAll(dispatch, [REMOVE_TIME_STEP(task, false), INCREASE_POINT_COUNT(), CHANGE_TIMER_TYPE('ready')])
        }}
    />
}

export function StopPauseFirstButton({ task }: { task: number }) {
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);
    const dispatch = useDispatch();

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.firstButton}
        text='Продолжить'
        callback={() => (dispatch(CHANGE_TIMER_TYPE('pause')))}
    />
}

export function StopPauseSecondButton({ length, task }: { length: number, task: number }) {
    const dispatch = useDispatch();
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[task].animationFlags.complete);

    return <Button
        className={deletionFlag ? styles.disabledButton : styles.secondButton}
        text='Пропустить'
        callback={() => {
            if (length <= 1) {
                useDispatchAll(dispatch, [TASK_COMPLETE_ANIMATION_FLAG(task, true), INCREASE_POINT_COUNT()]);
                return;
            }

            useDispatchAll(dispatch, [REMOVE_TIME_STEP(task, false), INCREASE_POINT_COUNT(), CHANGE_TIMER_TYPE('ready')])
        }}
    />
}

