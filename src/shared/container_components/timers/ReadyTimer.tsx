import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";
import React from "react";
import { TTask } from "../../redux_store/tasks_reducer";
import { ReadyFirstButton, ReadySecondButton } from "../TimerButtonCollection";
import { TTimeStep } from "../../redux_store/timer_reducer";
import { AnimatedTaskTimer } from "../animated_components/AnimatedTaskTimer";

export function ReadyTimer() {
    const tasks = useSelector<TCombinedState, TTask[]>(state => state.tasks.all);
    const { name, taskOrder } = tasks[0];
    
    const { workTime, order } = useSelector<TCombinedState, TTimeStep>(state => state.timer.timerQueue[0]);

    return (
        <AnimatedTaskTimer
            taskName={name}
            timerColor='Gray'
            numberColor='Gray'
            seconds={workTime}
            currentTimeStepOrder={`Помидор ${order + 1}`}
            firstButton={<ReadyFirstButton task={taskOrder} />}
            secondButton={<ReadySecondButton task={taskOrder} />}
        />
    )
}