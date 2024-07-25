// store.ts

import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import toastReducer from './toastSlice';
import logoutSlice from './logoutSlice';
import loginModalSlice from './loginModalSlice';
import createFeedModalSlice from './createFeedModalSlice';
import editProfileModalSlice from './editProfileModalSlice';

const rootReducer = {
  search: searchReducer,
  toast: toastReducer,
  logout: logoutSlice,
  loginModal: loginModalSlice,
  feedModal: createFeedModalSlice,
  profileModal: editProfileModalSlice,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
