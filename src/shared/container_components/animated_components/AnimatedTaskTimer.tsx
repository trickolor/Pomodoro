import React from "react";
import { Animation } from "../../Animation";
import styles from '../../TaskTimer/tasktimer.css';
import { ITaskTimer, TaskTimer } from "../../TaskTimer";

export function AnimatedTaskTimer(props: ITaskTimer) {
    return (
        <Animation
            containerClass={styles.container}
            shouldAnimate={true}
            tweens={[
                {
                    method: 'to',
                    animateChildren: false,
                    keyframes: { y: 50, opacity: 0.33, duration: 0.1 }
                },
                {
                    method: 'to',
                    animateChildren: false,
                    keyframes: { y: -25, opacity: 0.66, duration: 0.1 }
                },
                {
                    method: 'to',
                    animateChildren: false,
                    keyframes: { y: 0, opacity: 1, duration: 0.1 }
                }
            ]}
            children={
                <TaskTimer {...props} />
            }
        />
    );

}