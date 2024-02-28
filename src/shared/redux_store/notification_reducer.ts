import { createAction, createReducer } from "@reduxjs/toolkit";

export type TNotificationState = {
    popupOpen: boolean;
}

export const notificationState: TNotificationState = {
    popupOpen: typeof window === 'object' ? (Notification.permission !== 'granted') : false
}

export const TOGGLE_POPUP = createAction('TOGGLE_POPUP');

export const notificationReducer = createReducer(notificationState, (builder) => {
    builder
        .addCase(TOGGLE_POPUP, (state) => {
            state.popupOpen = !state.popupOpen;
        })
});