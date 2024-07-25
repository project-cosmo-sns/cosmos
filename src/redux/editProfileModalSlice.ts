import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { handleEditProfileModal } = editProfileModalSlice.actions;
export default editProfileModalSlice.reducer;
