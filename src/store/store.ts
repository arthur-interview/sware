import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import taskReducer from './reducers';

export const store = configureStore({
  reducer: taskReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk as any),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;