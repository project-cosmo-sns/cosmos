import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileModalState {
  isOpen: boolean;
}

const initialState: ProfileModalState = {
  isOpen: false,
};

const editProfileModalSlice = createSlice({
  name: 'profileModal',
  initialState,
  reducers: {
    handleEditProfileModal(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { handleEditProfileModal } = editProfileModalSlice.actions;
export default editProfileModalSlice.reducer;
