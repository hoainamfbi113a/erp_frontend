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
      let data = current(state);
      let {
        id,
        // rem_relationship,
        rem_full_name,
        rem_note,
        rem_job,
      } = action.payload;
      let existingData = data.find((item) => item.id === id);
      console.log("action: ", action.payload);
      console.log("data: ", existingData);
      if (existingData) {
        // existingData.rem_relationship = rem_relationship;
        existingData.rem_full_name = rem_full_name;
        existingData.rem_note = rem_note;
        existingData.rem_job = rem_job;
      }
    },
    updateFamilyFailed(state, action) {
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
  updateFamily,
  updateFamilySuccess,
  updateFamilyFailed
} = familySlice.actions;
export default familySlice.reducer;
