import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { logout, login } = logoutSlice.actions;
export default logoutSlice.reducer;
