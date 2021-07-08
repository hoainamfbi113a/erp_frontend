import { createSlice, current } from "@reduxjs/toolkit";
const abroadSlice = createSlice({
  name: "abroad",
  initialState: [],
  reducers: {
    getAbroad() {},
    setAbroad(state, action) {
      state = [...action.payload];
      return state;
    },
    addAbroad(state, action) {
      return [...state];
    },
    removeAbroad(state, action) {
      return [...state];
    },
    removeAbroadSuccess(state, action) {
      const data = current(state);
      const id = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeAbroadFailed(state, action) {
      return [...state];
    },
    updateAbroad(state, action) {
      return [...state];
    },
    updateAbroadSuccess(state, action) {
      const data = current(state);
      const {
        id,
        go_destination_country,
        go_purpose,
        go_time,
        go_time_comeback,
        go_expense,
        go_inviting_unit,
        go_content,
        go_is_reported,
        go_note
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].go_destination_country = go_destination_country;
        state[index].go_purpose = go_purpose;
        state[index].go_time = go_time;
        state[index].go_time_comeback = go_time_comeback;
        state[index].go_expense = go_expense;
        state[index].go_inviting_unit = go_inviting_unit;
        state[index].go_content = go_content;
        state[index].go_is_reported = go_is_reported;
        state[index].go_note = go_note;
      }
    },
    updateAbroadFailed(state, action) {
      return [...state];
    },
    eraseAbroad() {
      return []
    }
  },
});
export const {
  getAbroad,
  setAbroad,
  addAbroad,
  removeAbroad,
  removeAbroadSuccess,
  removeAbroadFailed,
  updateAbroad,
  updateAbroadSuccess,
  updateAbroadFailed,
  eraseAbroad
} = abroadSlice.actions;
export default abroadSlice.reducer;
