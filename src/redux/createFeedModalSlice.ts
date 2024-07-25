import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreateFeedModalState {
  isOpen: boolean;
}

const initialState: CreateFeedModalState = {
  isOpen: false,
};

const createFeedModalSlice = createSlice({
  name: 'createFeedModal',
  initialState,
  reducers: {
    handleCreateFeedModal(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { handleCreateFeedModal } = createFeedModalSlice.actions;
export default createFeedModalSlice.reducer;
