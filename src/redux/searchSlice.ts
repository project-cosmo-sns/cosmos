import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  keyword: string;
}

const initialState: SearchState = {
  keyword: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const { updateKeyword } = searchSlice.actions;
export default searchSlice.reducer;
