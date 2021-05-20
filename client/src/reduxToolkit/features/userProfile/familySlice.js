import { createSlice, current } from "@reduxjs/toolkit";
const familySlice = createSlice({
  name: "family",
  initialState: [],
  reducers: {
    getFamily() {},
    setFamily(state, action) {
      state = [...action.payload];
      return state;
    },
    addFamily(state, action) {
      return [...state];
    },
    removeFamily(state, action) {
      return [...state];
    },
    removeFamilySuccess(state, action) {
      const data = current(state);
      const id = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeFamilyFailed(state, action) {
      return [...state];
    },
  },
});
export const {
  getFamily,
  setFamily,
  addFamily,
  removeFamily,
  removeFamilySuccess,
  removeFamilyFailed,
} = familySlice.actions;
export default familySlice.reducer;
