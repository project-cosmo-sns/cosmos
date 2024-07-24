import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedModalState {
  isOpen: boolean;
}

const initialState: FeedModalState = {
  isOpen: false,
};

const createFeedModalSlice = createSlice({
  name: 'feedModal',
  initialState,
  reducers: {
    handleCreateFeedModal(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { handleCreateFeedModal } = createFeedModalSlice.actions;
export default createFeedModalSlice.reducer;
