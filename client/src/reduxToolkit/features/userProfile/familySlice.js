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
    updateFamily(state, action) {
      return [...state];
    },
    updateFamilySuccess(state, action) {
      const data = current(state);
      const {
        id,
        rem_relationship,
        rem_full_name,
        rem_note,
        rem_job,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].rem_relationship = rem_relationship;
        state[index].rem_full_name = rem_full_name;
        state[index].rem_note = rem_note;
        state[index].rem_job = rem_job;
      }
    },
    updateFamilyFailed(state, action) {
      return [...state];
    },
    eraseFamily() {
      return []
    }
  },
});
export const {
  getFamily,
  setFamily,
  addFamily,
  removeFamily,
  removeFamilySuccess,
  removeFamilyFailed,
  updateFamily,
  updateFamilySuccess,
  updateFamilyFailed,
  eraseFamily
} = familySlice.actions;
export default familySlice.reducer;
