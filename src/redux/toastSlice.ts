import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToastState {
  text: string;
  icon?: React.ReactNode;
  visible?: boolean;
}

const initialState: ToastState = {
  text: '',
  icon: undefined,
  visible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<ToastState>) {
      state.text = action.payload.text;
      state.icon = action.payload.icon;
      state.visible = true;
    },
    hideToast(state) {
      state.text = '';
      state.icon = '';
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
