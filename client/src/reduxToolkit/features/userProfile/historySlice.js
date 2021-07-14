import { createSlice, current } from "@reduxjs/toolkit";
const historySlice = createSlice({
  name: "history",
  initialState: [],
  reducers: {
    getHistory() {},
    setHistory(state, action) {
      state = [...action.payload];
      return state;
    },
    addHistory(state, action) {
      return [...state];
    },
    removeHistory(state, action) {
      return [...state];
    },
    removeHistorySuccess(state, action) {
      const data = current(state);
      const id = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeHistoryFailed(state, action) {
      return [...state];
    },
    updateHistory(state, action) {
      return [...state];
    },
    updateHistorySuccess(state, action) {
      const data = current(state);
      const {
        id,
        his_work_place,
        his_work_from,
        his_work_to,
        his_working_process,
        his_cityId,
        his_city,
        his_district,
        his_note,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].his_work_place = his_work_place;
        state[index].his_work_from = his_work_from;
        state[index].his_work_to = his_work_to;
        state[index].his_working_process = his_working_process;
        state[index].his_cityId = his_cityId;
        state[index].his_city = his_city;
        state[index].his_district = his_district;
        state[index].his_note = his_note;
      }
    },
    updateHistoryFailed(state, action) {
      return [...state];
    },
    eraseHistory() {
      return [];
    },
  },
});
export const {
  getHistory,
  setHistory,
  addHistory,
  removeHistory,
  removeHistorySuccess,
  removeHistoryFailed,
  updateHistory,
  updateHistorySuccess,
  updateHistoryFailed,
  eraseHistory,
} = historySlice.actions;
export default historySlice.reducer;
