import { createAction, createReducer } from "@reduxjs/toolkit";
import { statsData } from "../../utils/statsData";

export type TDay = {
    dayIndex: number;
    parentWeekIndex: number;
    date: string;
    weightCount: number;
    totalUse: number;
    stopTime: number;
    stopCount: number;
}

export type TWeek = {
    weekIndex: number;
    days: TDay[];
}

export type TStatsState = {
    weeks: TWeek[];
    displayDay: TDay;
    displayWeek: TWeek;
    animationFlag: boolean;
}

const statsState: TStatsState = statsData();

export const TOGGLE_WEEK = createAction<number>('TOGGLE_WEEK');
export const TOGGLE_DAY = createAction<number>('TOGGLE_DAY');
export const INCREASE_TOTAL_USE = createAction('INCREASE_TOTAL_USE');
export const INCREASE_STOP_TIME = createAction('INCREASE_STOP_TIME');
export const INCREASE_STOP_COUNT = createAction('INCREASE_STOP_COUNT');
export const INCREASE_POINT_COUNT = createAction('INCREASE_POINT_COUNT');
export const STATS_ANIMATION_FLAG = createAction<boolean>('STATS_ANIMATION_FLAG');
export const INJECT_BUFFER_DAYS = createAction<TDay[]>('INJECT_BUFFER_DAYS');
export const INJECT_BUFFER_DISPLAY_DAY = createAction<TDay>('INJECT_BUFFER_DISPLAY_DAY');
export const INJECT_BUFFER_DISPLAY_WEEK = createAction('INJECT_BUFFER_DISPLAY_WEEK', (bufferDisplayWeek: TWeek, bufferDisplayDay: TDay) => {
    return {
        payload: {
            bufferDisplayWeek,
            bufferDisplayDay
        }
    }
});


export const statsReducer = createReducer(statsState, (builder) => {
    builder
        .addCase(TOGGLE_WEEK, (state, action) => {
            state.displayWeek = state.weeks[action.payload];
        })
        .addCase(TOGGLE_DAY, (state, action) => {
            state.displayDay = state.displayWeek.days[action.payload];
        })
        .addCase(INCREASE_TOTAL_USE, (state) => {
            const date = new Date().toLocaleDateString('en-GB');

            const day = state.weeks.flatMap(i => i.days).find(i => i.date === date);

            if (day) {
                day.totalUse++;
            }

            if (state.displayDay?.date === date) {
                state.displayDay.totalUse++;
            }
        })
        .addCase(INCREASE_STOP_TIME, (state) => {
            const date = new Date().toLocaleDateString('en-GB');

            const day = state.weeks.flatMap(i => i.days).find(i => i.date === date);

            if (day) {
                day.stopTime++;
            }

            if (state.displayDay?.date === date) {
                state.displayDay.stopTime++;
            }
        })
        .addCase(INCREASE_STOP_COUNT, (state) => {
            const date = new Date().toLocaleDateString('en-GB');

            const day = state.weeks.flatMap(i => i.days).find(i => i.date === date);

            if (day) {
                day.stopCount++;
            }

            if (state.displayDay) {
                state.displayDay.stopCount++;
            }
        })
        .addCase(INCREASE_POINT_COUNT, (state) => {
            const date = new Date().toLocaleDateString('en-GB');

            const day = state.weeks.flatMap(i => i.days).find(i => i.date === date);

            if (day) {
                day.weightCount++;
            }

            if (state.displayDay) {
                state.displayDay.weightCount++;
            }
        })
        .addCase(INJECT_BUFFER_DAYS, (state, action) => {
            if (!action.payload.length) return;

            const allDays: TDay[] = state.weeks.flatMap(week => week.days);

            action.payload.forEach(bufferDay => {
                const index = allDays.findIndex(day => day.date === bufferDay.date);
                if (index === -1) return;

                allDays[index] = bufferDay;
            });

            state.weeks = [];
            for (let i = 0; i < allDays.length; i += 7) {
                state.weeks.push({
                    weekIndex: i / 7,
                    days: allDays.slice(i, i + 7)
                });
            }
        })
        .addCase(INJECT_BUFFER_DISPLAY_DAY, (state, action) => {
            state.displayDay = action.payload;
        })
        .addCase(INJECT_BUFFER_DISPLAY_WEEK, (state, action) => {
            const { bufferDisplayWeek, bufferDisplayDay } = action.payload;

            const rest = bufferDisplayWeek.days.filter(day => day.date !== bufferDisplayDay.date);

            state.displayWeek = {
                weekIndex: bufferDisplayWeek.weekIndex,
                days: [...rest, bufferDisplayDay].sort((a, b) => a.dayIndex - b.dayIndex)
            }
        });
});