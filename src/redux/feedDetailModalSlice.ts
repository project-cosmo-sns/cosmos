import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleEntireModal } from './\bentireModalSlice';

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
  extraReducers: (builder) => {
    builder.addCase(handleEntireModal, (state) => {
      state.isDetailOpen = false;
    });
  },
});

export const { handleFeedDetailModal } = feedDetailModalSlice.actions;
export default feedDetailModalSlice.reducer;
