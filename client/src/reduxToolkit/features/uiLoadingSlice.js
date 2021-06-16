import { createSlice } from "@reduxjs/toolkit";
const uiLoadingSlice = createSlice({
  name: "uiLoading",
  initialState: { showLoading: false },
  reducers: {
    showLoading(state, action) {
      return { ...state, showLoading: true };
    },
    hideLoading(state, action) {
      return { ...state, showLoading: false };
    },
  },
});
export const { showLoading, hideLoading } = uiLoadingSlice.actions;
export default uiLoadingSlice.reducer;
