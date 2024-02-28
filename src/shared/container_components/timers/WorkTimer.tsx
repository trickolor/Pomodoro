import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";
import React, { useEffect } from "react";
import { TTask } from "../../redux_store/tasks_reducer";
import { WorkFirstButton, WorkSecondButton } from "../TimerButtonCollection";
import { useInterval } from "../../../hooks/useInterval";
import { INCREASE_TOTAL_USE } from "../../redux_store/stats_reducer";
import { CHANGE_TIMER_TYPE, DECREASE_WORK_TIME, TTimeStep } from "../../redux_store/timer_reducer";
import audio from '../../audio/notification.mp3';
import { AnimatedTaskTimer } from "../animated_components/AnimatedTaskTimer";

export function WorkTimer() {
    const notificationAudio = new Audio(audio);
    const { name, taskOrder } = useSelector<TCombinedState, TTask>(state => state.tasks.all[0]);
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[taskOrder].animationFlags.complete);

    const notificationsAllowed = useSelector<TCombinedState, boolean>(state => state.settings.notificationsAllowed);

    const timerQueue = useSelector<TCombinedState, TTimeStep[]>(state => state.timer.timerQueue);
    const { workTime, order } = timerQueue[0];
    const currentTimeQueueLength = timerQueue.filter(i => i.taskOrder === taskOrder).length;

    useEffect(() => {
        if (workTime || !notificationsAllowed) return;

        new Notification('Первый помидор завершен!', { body: 'Теперь самое время насладиться перерывом.' });
        notificationAudio.play();

    }, [workTime])

    useInterval(
        CHANGE_TIMER_TYPE('pause'),
        workTime === 0,
        [DECREASE_WORK_TIME(taskOrder), workTime > 0 ? INCREASE_TOTAL_USE() : null],
        deletionFlag
    );

    return (
        <AnimatedTaskTimer
            taskName={name}
            timerColor='Red'
            numberColor='Red'
            seconds={workTime}
            currentTimeStepOrder={`Помидор ${order + 1}`}
            firstButton={<WorkFirstButton task={taskOrder} />}
            secondButton={<WorkSecondButton length={currentTimeQueueLength} task={taskOrder} />}
        />
    )
}