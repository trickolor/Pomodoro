import React from "react";
import { Animation } from "../../Animation";
import { Header } from "../../Header";
import styles from '../../Header/header.css';

export function AnimatedHeader() {
    return (
        <Animation
            containerClass={styles.header}
            shouldAnimate={true}
            tweens={[
                {
                    method: 'fromTo',
                    animateChildren: false,
                    keyframes: { from: { y: -100 }, to: { y: 0, duration: 1 } }
                }
            ]}
            children={
                <Header />
            }
        />
    )
}