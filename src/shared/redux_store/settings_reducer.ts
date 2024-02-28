import { createAction, createReducer } from "@reduxjs/toolkit";
import { TFormValues } from "../Settings";

export type TSettingsState = {
    work: number;
    pauseShort: number;
    pauseLong: number;
    frequency: number;
    notificationsAllowed: boolean;
    settingsOpen: boolean;
}

export const settingsState: TSettingsState = {
    work: 20,
    pauseShort: 5,
    pauseLong: 15,
    frequency: 4,
    notificationsAllowed: typeof window === 'object' ? Notification.permission === 'granted' : false,
    settingsOpen: false
}

export const TOGGLE_SETTINGS_OPEN = createAction('TOGGLE_SETTINGS_OPEN');

export const SET_SETTINGS = createAction<TFormValues>('SET_SETTINGS');

export const SET_NOTIFICATION_ALLOWED = createAction<boolean>('SET_NOTIFICATION_ALLOWED');

export const settingsReducer = createReducer(settingsState, (builder) => {
    builder
        .addCase(TOGGLE_SETTINGS_OPEN, (state) => {
            state.settingsOpen = !state.settingsOpen;
        })
        .addCase(SET_SETTINGS, (state, action) => {
            console.log(action.payload);
            const { work, pauseShort, pauseLong, frequency, notificationsAllowed } = action.payload;
            state.frequency = frequency;
            state.work = work;
            state.pauseShort = pauseShort;
            state.pauseLong = pauseLong;
            state.notificationsAllowed = notificationsAllowed;
        })
        .addCase(SET_NOTIFICATION_ALLOWED, (state, action) => {
            state.notificationsAllowed = action.payload;
        })
});