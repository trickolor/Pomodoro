import { createAction, createReducer } from "@reduxjs/toolkit";
import { TFormValues } from "../Settings";

export type TTimerType = 'empty' | 'ready' | 'work' | 'pause' | 'stop_work' | 'stop_pause';

export type TTimeStep = {
    taskOrder: number;
    order: number;
    workTime: number;
    pauseTime: number;
}

export type TTimerState = {
    timerType: TTimerType;
    timerQueue: TTimeStep[];
    timerFlag: boolean;
}

const timerState: TTimerState = {
    timerType: 'empty',
    timerQueue: [],
    timerFlag: false,
}

export const CHANGE_TIMER_TYPE = createAction<TTimerType>('CHANGE_TIMER_TYPE');
export const ADD_TIME_STEP = createAction('ADD_TIME_STEP', (order: number, values: TFormValues) => {
    return {
        payload: {
            order,
            values
        }
    }
});
export const DECREASE_PAUSE_TIME = createAction<number>('DECREASE_PAUSE_TIME');
export const DECREASE_WORK_TIME = createAction<number>('DECREASE_WORK_TIME');
export const REMOVE_TIME_STEP = createAction('REMOVE_TIME_STEP', (taskOrder: number, removeLast: boolean) => {
    return {
        payload: {
            taskOrder,
            removeLast
        }
    }
});
export const PATCH_TIME_STEPS = createAction<number>('PATCH_TIME_STEPS');
export const SET_TIME_STEPS = createAction<TFormValues>('SET_TIME_STEPS');
export const ADD_WORK_TIME = createAction('ADD_WORK_TIME');
export const ADD_PAUSE_TIME = createAction('ADD_PAUSE_TIME');

export const timerReducer = createReducer(timerState, (builder) => {
    builder
        .addCase(ADD_WORK_TIME, (state) => {
            state.timerQueue[0].workTime += 60;
        })
        .addCase(ADD_PAUSE_TIME, (state) => {
            state.timerQueue[0].pauseTime += 60;
        })
        .addCase(CHANGE_TIMER_TYPE, (state, action) => {
            state.timerType = action.payload;
        })
        .addCase(ADD_TIME_STEP, (state, action) => {
            const order = state.timerQueue.filter(i => i.taskOrder === action.payload.order).length;
            const { work, pauseShort, pauseLong, frequency } = action.payload.values;

            const timeStep: TTimeStep = {
                taskOrder: action.payload.order,
                order: order,
                workTime: work * 60,
                pauseTime: (order !== 1 && (order + 1) % frequency === 0) ? pauseLong * 60 : pauseShort * 60
            }

            state.timerQueue = [...state.timerQueue, timeStep].sort((a, b) => a.taskOrder - b.taskOrder);
        })
        .addCase(DECREASE_PAUSE_TIME, (state) => {
            state.timerQueue[0].pauseTime--;
        })
        .addCase(DECREASE_WORK_TIME, (state) => {
            state.timerQueue[0].workTime--;
        })
        .addCase(REMOVE_TIME_STEP, (state, action) => {
            const rest: TTimeStep[] = [];
            const taskTime: TTimeStep[] = [];

            state.timerQueue.forEach(i => i.taskOrder === action.payload.taskOrder ? taskTime.push(i) : rest.push(i));

            action.payload.removeLast ? taskTime.pop() : taskTime.shift();

            state.timerQueue = [...rest, ...taskTime].sort((a, b) => a.taskOrder - b.taskOrder);
        })
        .addCase(PATCH_TIME_STEPS, (state, action) => {
            const indexToDelete = action.payload;
            state.timerQueue.forEach((step) => {
                if (step.taskOrder >= indexToDelete) {
                    step.taskOrder -= 1;
                }
            });
        })
        .addCase(SET_TIME_STEPS, (state, action) => {
            const { work, pauseShort, pauseLong, frequency } = action.payload;

            state.timerQueue = state.timerQueue.map(i => {
                return {
                    order: i.order,
                    taskOrder: i.taskOrder,
                    workTime: work * 60,
                    pauseTime: (i.order !== 1 && (i.order + 1) % frequency === 0) ? pauseLong * 60 : pauseShort * 60
                }
            })
        });
});