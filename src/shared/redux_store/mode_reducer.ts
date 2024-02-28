import { createAction, createReducer } from "@reduxjs/toolkit";

export type TModeState = {
    isDark: boolean;
    togglerFlag: boolean;
}

export const modeState: TModeState = {
    isDark: typeof window === 'object' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
    togglerFlag: false
}

export const TOGGLE_MODE = createAction('TOGGLE_MODE');
export const TOGGLER_FLAG = createAction<boolean>('TOGGLER_FLAG');

export const modeReducer = createReducer(modeState, (builder) => {
    builder
        .addCase(TOGGLE_MODE, (state) => {
            state.isDark = !state.isDark;
        })
        .addCase(TOGGLER_FLAG, (state, action) => {
            state.togglerFlag = action.payload;
        });
});