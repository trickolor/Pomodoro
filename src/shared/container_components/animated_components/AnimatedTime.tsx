import React from 'react';
import styles from './time.css';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../../redux_store/store';
import { TTimerType } from '../../redux_store/timer_reducer';
import { ADD_PAUSE_TIME, ADD_WORK_TIME } from '../../redux_store/timer_reducer';
import { Animation } from '../../Animation';

interface ITimeProps {
    seconds: number;
    color: 'Yellow' | 'Red' | 'Gray';
}

export function AnimatedTime(props: ITimeProps) {
    const { seconds, color } = props;

    const colors = {
        'Yellow': styles.valueYellow,
        'Red': styles.valueRed,
        'Gray': styles.valueGray
    }

    const dispatch = useDispatch();
    const timerType = useSelector<TCombinedState, TTimerType>(state => state.timer.timerType);
    const deletionFlag = useSelector<TCombinedState, boolean>(state => state.tasks.all[0]?.animationFlags.complete || false);

    const handleAdd = () => {
        switch (timerType) {
            case 'empty':
                return
            case 'ready':
            case 'work':
            case 'stop_work':
                dispatch(ADD_WORK_TIME());
                break;
            case 'pause':
            case 'stop_pause':
                dispatch(ADD_PAUSE_TIME());
                break;
        }
    }

    const convertedSeconds = seconds % 60;
    const convertedMinutes = (seconds - convertedSeconds) / 60;
    const timeString = `${convertedMinutes / 10 < 1 ? `0${convertedMinutes}` : convertedMinutes}:${(convertedSeconds) / 10 < 1 ? `0${(convertedSeconds)}` : (convertedSeconds)}`;

    return (
        <div className={styles.container}>
            <Animation
                containerClass={colors[color]}
                textContent={timeString}
                deps={[seconds]}
                shouldAnimate={true}
                tweens={
                    [
                        {
                            method: 'from',
                            animateChildren: false,
                            keyframes: { scale: 1.05 }
                        }
                    ]
                }
            />

            <Button className={timerType === 'empty' || deletionFlag ? styles.buttonDisabled : styles.button} callback={handleAdd} children={<Icon name='Plus' />} />
        </div>
    );
}