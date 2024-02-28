import React from "react";
import { Animation } from "../../Animation";
import styles from '../../Bar/bar.css';
import { Bar, IBarProps } from "../../Bar";

export function AnimatedBar(props: IBarProps) {
    return (
        <Animation
            containerClass={styles.barContainer}
            shouldAnimate={true}
            tweens={[
                {
                    method: 'from',
                    animateChildren: false,
                    keyframes: { scaleY: 0, delay: 1 }
                }
            ]}
            children={
                <Bar {...props} />
            }
        />
    );
}