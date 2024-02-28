import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { useDispatchAll } from "./useDisaptchAll";

type TIntervalAction = AnyAction | (AnyAction | null)[] | null;

export function useInterval(timeoutActions: TIntervalAction, timeoutCondition: boolean, intervalActions: TIntervalAction, clear?: boolean) {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (!intervalActions) return;
            Array.isArray(intervalActions) ? useDispatchAll(dispatch, intervalActions) : dispatch(intervalActions);

            if (!timeoutCondition || !timeoutActions) return;
            Array.isArray(timeoutActions) ? useDispatchAll(dispatch, timeoutActions) : dispatch(timeoutActions);

        }, 1000);

        if (clear) {
            window.clearInterval(interval);
        }

        return () => {
            window.clearInterval(interval);
        }

    }, [dispatch, timeoutCondition, clear]);
}
