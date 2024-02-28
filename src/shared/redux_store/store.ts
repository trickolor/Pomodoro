import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TTimerState, timerReducer } from "./timer_reducer";
import { TTasksState, tasksReducer } from './tasks_reducer';
import { TInputState, inputReducer } from './input_reducer';
import { TSelectState, selectReducer } from './select_reducer';
import { TStatsState, statsReducer } from './stats_reducer';
import { TModeState, modeReducer } from './mode_reducer';
import { TNotificationState, notificationReducer } from './notification_reducer';
import { TSettingsState, settingsReducer } from './settings_reducer';
import { TBufferState, bufferReducer } from './buffer_reducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

export type TCombinedState = {
    input: TInputState;
    timer: TTimerState;
    tasks: TTasksState;
    select: TSelectState;
    stats: TStatsState;
    mode: TModeState;
    notification: TNotificationState;
    settings: TSettingsState;
    buffer: TBufferState;
}

const rootReducer = combineReducers({
    input: inputReducer,
    timer: timerReducer,
    tasks: tasksReducer,
    select: selectReducer,
    stats: statsReducer,
    mode: modeReducer,
    notification: notificationReducer,
    settings: settingsReducer,
    buffer: bufferReducer
})

const persistConfig = {
    key: 'persist_store',
    storage: storage,
    blacklist: ['stats', 'notification']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);


