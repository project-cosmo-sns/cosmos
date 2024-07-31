import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedDetailModalState {
  isDetailOpen: boolean;
}

const initialState: FeedDetailModalState = {
  isDetailOpen: false,
};

const feedDetailModalSlice = createSlice({
  name: 'feedDetailModal',
  initialState,
  reducers: {
    handleFeedDetailModal(state, action: PayloadAction<boolean>) {
      state.isDetailOpen = action.payload;
    },
  },
});

export const { handleFeedDetailModal } = feedDetailModalSlice.actions;
export default feedDetailModalSlice.reducer;
