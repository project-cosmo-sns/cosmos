import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleEntireModal } from './\bentireModalSlice';

interface ProfileModalState {
  isProfileOpen: boolean;
}

const initialState: ProfileModalState = {
  isProfileOpen: false,
};

const editProfileModalSlice = createSlice({
  name: 'profileModal',
  initialState,
  reducers: {
    handleEditProfileModal(state, action: PayloadAction<boolean>) {
      state.isProfileOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleEntireModal, (state) => {
      state.isProfileOpen = false;
    });
  },
});

export const { handleEditProfileModal } = editProfileModalSlice.actions;
export default editProfileModalSlice.reducer;
