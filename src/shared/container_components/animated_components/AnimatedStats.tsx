import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart } from "../../Chart";
import { Metric } from "../../Metric";
import { PointCount } from "../../PointCount";
import { TodayHours } from "../../TodayHours";
import { XScale } from "../../XScale";
import { YScale } from "../../YScale";
import { TCombinedState } from "../../redux_store/store";
import { Animation } from "../../Animation";
import styles from '../../StatsContent/statscontent.css';
import { TStatsState } from "../../redux_store/stats_reducer";
import { useDispatchAll } from "../../../hooks/useDisaptchAll";
import { BUFFER_WATCH_DISPLAY_DAY, BUFFER_WATCH_DISPLAY_WEEK } from "../../redux_store/buffer_reducer";

export function AnimatedStats() {
    const dispatch = useDispatch();
    const displayWeekIndex = useSelector<TCombinedState, number>(state => state.select.displayWeekIndex);
    const { displayDay, displayWeek } = useSelector<TCombinedState, TStatsState>(state => state.stats);

    useEffect(() => {
        useDispatchAll(dispatch, [BUFFER_WATCH_DISPLAY_DAY(displayDay), BUFFER_WATCH_DISPLAY_WEEK(displayWeek)])
    }, [displayDay, displayWeek]);

    return (
        <Animation
            shouldAnimate={true}
            containerClass={styles.grid}
            deps={[displayWeekIndex]}
            tweens={[
                {
                    method: 'from',
                    animateChildren: true,
                    keyframes: { opacity: 0, delay: 0.5, duration: 0.5 },
                }
            ]}
            children={
                <>
                    <div className={styles.gridElement}>
                        <TodayHours />
                    </div>
                    <div className={styles.chartGrid}>
                        <div className={styles.chartElement}>
                            <Chart />
                        </div>
                        <div className={styles.chartElement}>
                            <YScale />
                        </div>
                        <div className={styles.chartElement}>
                            <XScale />
                        </div>
                    </div>
                    <div className={styles.gridElement}>
                        <PointCount />
                    </div>
                    <div className={styles.metricsGrid}>
                        <div className={styles.metricsElement}>
                            <Metric type='focus' />
                        </div>
                        <div className={styles.metricsElement}>
                            <Metric type='pause' />
                        </div>
                        <div className={styles.metricsElement}>
                            <Metric type='stop' />
                        </div>
                    </div>
                </>
            }
        />
    )
}