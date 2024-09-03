import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {},
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
