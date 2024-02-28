import { createAction, createReducer } from "@reduxjs/toolkit";

export type TInputState = {
    formInputValue: string;
    taskInputValue: string;
}

const inputState: TInputState = {
    formInputValue: '',
    taskInputValue: '',
}

export const CHANGE_FORM_INPUT_VALUE = createAction<string>('CHANGE_FORM_INPUT_VALUE');
export const CHANGE_TASK_INPUT_VALUE = createAction<string>('CHANGE_TASK_INPUT_VALUE');

export const inputReducer = createReducer(inputState, (builder) => {
    builder
        .addCase(CHANGE_FORM_INPUT_VALUE, (state, action) => {
            state.formInputValue = action.payload;
        })
        .addCase(CHANGE_TASK_INPUT_VALUE, (state, action) => {
            state.taskInputValue = action.payload;
        })
});