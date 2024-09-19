import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleEntireModal } from './\bentireModalSlice';

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
  extraReducers: (builder) => {
    builder.addCase(handleEntireModal, (state) => {
      state.isOpen = false;
    });
  },
});

export const { handleCreateFeedModal } = createFeedModalSlice.actions;
export default createFeedModalSlice.reducer;
