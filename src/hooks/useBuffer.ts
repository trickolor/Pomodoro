import { useDispatch, useSelector } from "react-redux";
import { TCombinedState } from "../shared/redux_store/store";
import { TDay, TStatsState } from "../shared/redux_store/stats_reducer";
import { useEffect, useMemo } from "react";
import { BUFFER_WATCH_CURRENT_DAY, BUFFER_WATCH_DISPLAY_DAY, BUFFER_WATCH_DISPLAY_WEEK } from "../shared/redux_store/buffer_reducer";
import { TTask } from "../shared/redux_store/tasks_reducer";

export function useBuffer() {
    const dispatch = useDispatch();
    const stats = useSelector<TCombinedState, TStatsState>(state => state.stats);
    const { weeks, displayDay, displayWeek } = stats;

    const currentDate = new Date();
    const currentDay = useMemo(() => weeks.flatMap(i => i.days).find(i => i.date === currentDate.toLocaleDateString('en-GB')) as TDay, [currentDate]);

    const tasks = useSelector<TCombinedState, TTask[]>(state => state.tasks.all);
    const flagCheck = [...tasks].map(i => i.animationFlags.complete || !i.animationFlags.container);

    useEffect(() => {
        if (!flagCheck.includes(true)) {
            dispatch(BUFFER_WATCH_CURRENT_DAY(currentDay));
            dispatch(BUFFER_WATCH_DISPLAY_DAY(displayDay));
            dispatch(BUFFER_WATCH_DISPLAY_WEEK(displayWeek));
        }
    }, [stats, tasks])
}