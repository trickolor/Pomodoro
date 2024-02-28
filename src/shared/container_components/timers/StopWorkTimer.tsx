import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";
import React from "react";
import { TTask } from "../../redux_store/tasks_reducer";
import { StopWorkFirstButton, StopWorkSecondButton } from "../TimerButtonCollection";
import { useInterval } from "../../../hooks/useInterval";
import { INCREASE_STOP_TIME } from "../../redux_store/stats_reducer";
import { TTimeStep } from "../../redux_store/timer_reducer";
import { AnimatedTaskTimer } from "../animated_components/AnimatedTaskTimer";

export function StopWorkTimer() {
    const { name, taskOrder } = useSelector<TCombinedState, TTask[]>(state => state.tasks.all)[0];

    const timerQueue = useSelector<TCombinedState, TTimeStep[]>(state => state.timer.timerQueue);
    const { workTime, order } = timerQueue[0];
    const currentTimeQueueLength = timerQueue.filter(i => i.taskOrder === taskOrder).length;

    useInterval(
        null,
        true,
        INCREASE_STOP_TIME()
    );

    return (
        <AnimatedTaskTimer
            taskName={name}
            timerColor='Red'
            numberColor='Gray'
            seconds={workTime}
            currentTimeStepOrder={`Помидор ${order + 1}`}
            firstButton={<StopWorkFirstButton task={taskOrder} />}
            secondButton={<StopWorkSecondButton length={currentTimeQueueLength} task={taskOrder} />}
        />
    )
}