import { createAction, createReducer } from "@reduxjs/toolkit";

const options: string[] = ['Эта неделя', 'Прошлая неделя', '2 недели назад']

export type TSelectState = {
    options: string[];
    order: number[];
    displayWeekIndex: number;
    isOpen: boolean;
    animationFlag: boolean;
}

const selectState: TSelectState = {
    options: options,
    order: [0, 1, 2],
    displayWeekIndex: 0,
    isOpen: false,
    animationFlag: false,
}

export const SET_OPTION_CURRENT = createAction<number>('SET_OPTION_CURRENT');
export const TOGGLE_SELECT_OPEN = createAction('TOGGLE_SELECT_OPEN');
export const SELECT_ANIMATION_FLAG = createAction<boolean>('SELECT_ANIMATION_FLAG');

export const selectReducer = createReducer(selectState, (builder) => {
    builder
        .addCase(SET_OPTION_CURRENT, (state, action) => {
            const rest = state.order.filter(i => i !== action.payload).sort();
            state.order = [action.payload, ...rest];
            state.displayWeekIndex = action.payload;
        })
        .addCase(TOGGLE_SELECT_OPEN, (state) => {
            state.isOpen = !state.isOpen;
        })
        .addCase(SELECT_ANIMATION_FLAG, (state, action) => {
            state.animationFlag = action.payload;
        })
});