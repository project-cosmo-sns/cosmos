// store.ts

import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import toastReducer from './toastSlice';
import logoutSlice from './logoutSlice';
import loginModalSlice from './loginModalSlice';
import createFeedModalReducer from './createFeedModalSlice';
import editProfileModalReducer from './editProfileModalSlice';
import feedDetailModalReducer from './feedDetailModalSlice';

const rootReducer = {
  search: searchReducer,
  toast: toastReducer,
  logout: logoutSlice,
  loginModal: loginModalSlice,
  createFeedModal: createFeedModalReducer,
  editProfileModal: editProfileModalReducer,
  feedDetailModal: feedDetailModalReducer,
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
