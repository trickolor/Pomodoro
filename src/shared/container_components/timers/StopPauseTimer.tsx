import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";
import React from "react";
import { TTask } from "../../redux_store/tasks_reducer";
import { StopPauseFirstButton, StopPauseSecondButton } from "../TimerButtonCollection";
import { INCREASE_STOP_TIME } from "../../redux_store/stats_reducer";
import { useInterval } from "../../../hooks/useInterval";
import { TTimeStep } from "../../redux_store/timer_reducer";
import { AnimatedTaskTimer } from "../animated_components/AnimatedTaskTimer";

export function StopPauseTimer() {
    const { name, taskOrder } = useSelector<TCombinedState, TTask[]>(state => state.tasks.all)[0];

    const timerQueue = useSelector<TCombinedState, TTimeStep[]>(state => state.timer.timerQueue);
    const { pauseTime, order } = timerQueue[0];
    const currentTimeQueueLength = timerQueue.filter(i => i.taskOrder === taskOrder).length;

    useInterval(
        null,
        true,
        INCREASE_STOP_TIME()
    );

    return (
        <AnimatedTaskTimer
            taskName={name}
            timerColor='Yellow'
            numberColor='Gray'
            seconds={pauseTime}
            currentTimeStepOrder={`Помидор ${order + 1}`}
            firstButton={<StopPauseFirstButton task={taskOrder} />}
            secondButton={<StopPauseSecondButton length={currentTimeQueueLength} task={taskOrder} />}
        />
    )
}