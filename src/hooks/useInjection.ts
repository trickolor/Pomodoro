import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INJECT_BUFFER_DAYS, INJECT_BUFFER_DISPLAY_DAY, INJECT_BUFFER_DISPLAY_WEEK } from "../shared/redux_store/stats_reducer";
import { TCombinedState } from "../shared/redux_store/store";
import { TBufferState } from "../shared/redux_store/buffer_reducer";
import { useDispatchAll } from "./useDisaptchAll";
import { TTask } from "../shared/redux_store/tasks_reducer";

export function useInjection() {
    const dispatch = useDispatch();
    const { bufferDays, bufferDisplayDay, bufferDisplayWeek } = useSelector<TCombinedState, TBufferState>(state => state.buffer);

    const tasks = useSelector<TCombinedState, TTask[]>(state => state.tasks.all);
    const flagCheck = [...tasks].map(i => i.animationFlags.complete || !i.animationFlags.container);

    useEffect(() => {
        if (!flagCheck.includes(true))
            useDispatchAll(dispatch, [
                INJECT_BUFFER_DAYS(bufferDays),
                bufferDisplayDay ? INJECT_BUFFER_DISPLAY_DAY(bufferDisplayDay) : null,
                (bufferDisplayWeek && bufferDisplayDay) ? INJECT_BUFFER_DISPLAY_WEEK(bufferDisplayWeek, bufferDisplayDay) : null
            ]);
    }, [])
}