import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EntireModalState {
  isEntireModalOpen: boolean;
}

const initialState: EntireModalState = {
  isEntireModalOpen: true,
};

const entireModalSlice = createSlice({
  name: 'entireModalSlice',
  initialState,
  reducers: {
    handleEntireModal: (state, action: PayloadAction<boolean>) => {
      state.isEntireModalOpen = action.payload;
    },
  },
});

export const { handleEntireModal } = entireModalSlice.actions;
export default entireModalSlice.reducer;
