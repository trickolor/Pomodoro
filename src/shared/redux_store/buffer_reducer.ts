import { createReducer, createAction } from "@reduxjs/toolkit";
import { TDay, TWeek } from "./stats_reducer";

export type TBufferState = {
    bufferDays: TDay[];
    bufferDisplayDay: TDay | null;
    bufferDisplayWeek: TWeek | null;
}

export const bufferState: TBufferState = {
    bufferDays: [],
    bufferDisplayDay: null,
    bufferDisplayWeek: null
}


export const BUFFER_WATCH_CURRENT_DAY = createAction<TDay>('BUFFER_WATCH_CURRENT_DAY');
export const BUFFER_WATCH_DISPLAY_DAY = createAction<TDay>('BUFFER_WATCH_DISPLAY_DAY');
export const BUFFER_WATCH_DISPLAY_WEEK = createAction<TWeek>('BUFFER_WATCH_DISPLAY_WEEK');

export const bufferReducer = createReducer(bufferState, (builder) => {
    builder
        .addCase(BUFFER_WATCH_CURRENT_DAY, (state, action) => {
            const existingDayIndex = state.bufferDays.findIndex(day => day.date === action.payload.date);

            if (existingDayIndex === -1) {
                state.bufferDays.push(action.payload);
                return;
            }

            state.bufferDays[existingDayIndex] = action.payload;

            if (action.payload.date === state.bufferDisplayDay?.date) {
                state.bufferDisplayDay = action.payload;
            }
        })
        .addCase(BUFFER_WATCH_DISPLAY_DAY, (state, action) => {
            if (!action.payload) return;
            state.bufferDisplayDay = action.payload;
        })
        .addCase(BUFFER_WATCH_DISPLAY_WEEK, (state, action) => {
            if (!action.payload) return;
            state.bufferDisplayWeek = action.payload;
        });
});