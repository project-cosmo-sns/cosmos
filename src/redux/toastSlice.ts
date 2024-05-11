import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToastState {
  text: string;
  type?: string;
  visible?: boolean;
}

const initialState: ToastState = {
  text: '',
  type: '',
  visible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<ToastState>) {
      state.text = action.payload.text;
      state.type = action.payload.type;
      state.visible = true;
    },
    hideToast(state) {
      state.text = '';
      state.type = '';
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
