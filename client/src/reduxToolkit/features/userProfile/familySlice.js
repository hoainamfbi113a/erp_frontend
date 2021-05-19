import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    getFamily() {},
    setFamily(state, action) {
      return action.payload;
    },
    addFamily(state, action) {
      state.push(action.payload);
    },
  },
});
export const { getFamily, setFamily, addFamily } = familySlice.actions;
export default familySlice.reducer;
