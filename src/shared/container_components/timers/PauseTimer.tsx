import { useDispatch, useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";
import React, { useEffect } from "react";
import { TASK_COMPLETE_ANIMATION_FLAG, TTask } from "../../redux_store/tasks_reducer";
import { PauseFirstButton, PauseSecondButton } from "../TimerButtonCollection";
import { useInterval } from "../../../hooks/useInterval";
import { CHANGE_TIMER_TYPE, DECREASE_PAUSE_TIME, REMOVE_TIME_STEP, TTimeStep } from "../../redux_store/timer_reducer";
import { INCREASE_POINT_COUNT, INCREASE_TOTAL_USE } from "../../redux_store/stats_reducer";
import { useDispatchAll } from "../../../hooks/useDisaptchAll";
import audio from '../../audio/notification.mp3';
import { AnimatedTaskTimer } from "../animated_components/AnimatedTaskTimer";

export function PauseTimer() {
    const dispatch = useDispatch();

    const { name, taskOrder } = useSelector<TCombinedState, TTask>(state => state.tasks.all[0]);
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[taskOrder].animationFlags.complete);

    const notificationAudio = new Audio(audio);
    const notificationsAllowed = useSelector<TCombinedState, boolean>(state => state.settings.notificationsAllowed);

    const timerQueue = useSelector<TCombinedState, TTimeStep[]>(state => state.timer.timerQueue);
    const { pauseTime, order } = timerQueue[0];

    const currentTimeQueueLength = timerQueue.filter(i => i.taskOrder === taskOrder).length;
    const totalTimeQueueLength = timerQueue.length;

    useInterval(
        null,
        true,
        [DECREASE_PAUSE_TIME(taskOrder), pauseTime > 0 ? INCREASE_TOTAL_USE() : null],
        deletionFlag
    );

    useEffect(() => {
        if (pauseTime || !notificationsAllowed || !totalTimeQueueLength) return;
        notificationAudio.play();

        if (totalTimeQueueLength === 1) {
            new Notification('Все задачи выполнены!', { body: 'Самое время добавить новые или просмотреть статистику.' });
            useDispatchAll(dispatch, [TASK_COMPLETE_ANIMATION_FLAG(taskOrder, true), INCREASE_POINT_COUNT()]);
            return;
        }

        if (currentTimeQueueLength === 1) {
            new Notification('Перерыв окончен!', { body: 'Самое время приступить к следующему помидору.' });
            useDispatchAll(dispatch, [TASK_COMPLETE_ANIMATION_FLAG(taskOrder, true), INCREASE_POINT_COUNT()]);
            return;
        }

        new Notification('Перерыв окончен!', { body: 'Самое время приступить к следующему помидору.' });
        useDispatchAll(dispatch, [CHANGE_TIMER_TYPE('ready'), REMOVE_TIME_STEP(taskOrder, false)]);

    }, [pauseTime, timerQueue])

    return (
        <AnimatedTaskTimer
            taskName={name}
            timerColor='Yellow'
            numberColor='Yellow'
            seconds={pauseTime}
            currentTimeStepOrder={`Перерыв ${order + 1}`}
            firstButton={<PauseFirstButton task={taskOrder} />}
            secondButton={<PauseSecondButton length={length} task={taskOrder} />}
        />
    )
}