// searchSlice.ts

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
    clearKeyword(state) {
      state.keyword = '';
    },
    initializeKeyword(state) {
      state.keyword = ''; // 검색어 초기화 액션 추가
    },
  },
});

export const { updateKeyword, clearKeyword, initializeKeyword } =
  searchSlice.actions;
export default searchSlice.reducer;
