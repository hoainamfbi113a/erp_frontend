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
        rem_birthday,
        rem_job,
        rem_workplace,
        rem_historical_features,
        rem_residence,
        rem_note,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].rem_relationship = rem_relationship;
        state[index].rem_full_name = rem_full_name;
        state[index].rem_birthday = rem_birthday;
        state[index].rem_job = rem_job;
        state[index].rem_workplace = rem_workplace;
        state[index].rem_historical_features = rem_historical_features;
        state[index].rem_residence = rem_residence;
        state[index].rem_note = rem_note;
      }
    },
    updateFamilyFailed(state, action) {
      return [...state];
    },
    eraseFamily() {
      return [];
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
  updateFamilyFailed,
  eraseFamily,
} = familySlice.actions;
export default familySlice.reducer;
