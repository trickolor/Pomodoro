import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Animation } from "../../Animation";
import { TCombinedState } from "../../redux_store/store";
import { SELECT_ANIMATION_FLAG, SET_OPTION_CURRENT, TOGGLE_SELECT_OPEN, TSelectState } from "../../redux_store/select_reducer";
import styles from '../../Select/select.css';
import { useDispatchAll } from "../../../hooks/useDisaptchAll";
import { IItemProps, List } from "../../List";
import { TOGGLE_WEEK, TOGGLE_DAY, TStatsState } from "../../redux_store/stats_reducer";

interface IAnimatedSelectListProps {
    excludeRef: React.RefObject<HTMLDivElement>;
}

export function AnimatedSelectList({ excludeRef }: IAnimatedSelectListProps) {
    const dispatch = useDispatch();
    const { animationFlag, isOpen, options, order } = useSelector<TCombinedState, TSelectState>(state => state.select);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, secondIndex, thirdIndex] = order;
    const { displayDay } = useSelector<TCombinedState, TStatsState>(state => state.stats);
    const { dayIndex } = displayDay;

    const LIST: IItemProps[] = [
        {
            As: 'li',
            text: options[secondIndex],
            className: styles.option,
            onClick: () => useDispatchAll(dispatch, [
                SET_OPTION_CURRENT(secondIndex),
                TOGGLE_WEEK(secondIndex),
                TOGGLE_DAY(dayIndex)
            ])
        },

        {
            As: 'li',
            text: options[thirdIndex],
            className: styles.option,
            onClick: () => useDispatchAll(dispatch, [
                SET_OPTION_CURRENT(thirdIndex),
                TOGGLE_WEEK(thirdIndex),
                TOGGLE_DAY(dayIndex)
            ])
        }
    ]

    return (
        <Animation
            containerClass={styles.container}
            shouldAnimate={animationFlag}
            deps={[animationFlag]}
            tweens={[
                isOpen
                    ? {
                        method: 'from',
                        animateChildren: false,
                        keyframes: { y: -100, opacity: 0, duration: 0.3 },
                        callback: () => dispatch(SELECT_ANIMATION_FLAG(false))
                    }
                    : {
                        method: 'to',
                        animateChildren: false,
                        keyframes: { y: 100, opacity: 0, duration: 0.3 },
                        callback: () => dispatch(SELECT_ANIMATION_FLAG(false))
                    }
            ]}
            children={<List As='ul' items={LIST} className={styles.list} />}
            outsideClick={{
                callback: () => useDispatchAll(dispatch, [TOGGLE_SELECT_OPEN(), SELECT_ANIMATION_FLAG(true)]),
                excludeRef: excludeRef
            }}
        />
    )
}