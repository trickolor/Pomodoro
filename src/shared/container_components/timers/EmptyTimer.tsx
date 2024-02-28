import React from "react";
import { EmptyFirstButton, EmptySecondButton } from "../TimerButtonCollection";
import { AnimatedTaskTimer } from "../animated_components/AnimatedTaskTimer";

export function EmptyTimer() {
    return (
        <AnimatedTaskTimer
            taskName='&nbsp;'
            isEmpty={true}
            timerColor='Gray'
            numberColor='Gray'
            seconds={0}
            currentTimeStepOrder=''
            firstButton={<EmptyFirstButton />}
            secondButton={<EmptySecondButton />}
        />
    );
}
