import { editorReducer } from '@/features/editor/editorSlice';
import { configureStore } from '@reduxjs/toolkit';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

export const makeStore = () => {
  const persistedEditorReducer = persistReducer(
    {
      key: 'editor',
      version: 1,
      storage,
    },
    editorReducer,
  );

  const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      editor: persistedEditorReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
