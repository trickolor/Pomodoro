import { Dispatch } from "react";
import { AnyAction } from "redux";

// хуки заставляют использовать dispatch как аргумент :(
export function useDispatchAll(dispatchFunction: Dispatch<AnyAction>, actions: (AnyAction | null)[]) {
    for (const action of actions) {
        if (action) {
            dispatchFunction(action);
        }
    }
}