import { createSlice, current } from "@reduxjs/toolkit";
const historySlice2 = createSlice({
  name: "history2",
  initialState: [],
  reducers: {
    getHistory2() {},
    setHistory2(state, action) {
      state = [...action.payload];
      return state;
    },
    addHistory2(state, action) {
      return [...state];
    },
    removeHistory2(state, action) {
      return [...state];
    },
    removeHistorySuccess2(state, action) {
      const data = current(state);
      const id = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeHistoryFailed2(state, action) {
      return [...state];
    },
    updateHistory2(state, action) {
      return [...state];
    },
    updateHistorySuccess2(state, action) {
      const data = current(state);
      const {
        id,
        his_work_place,
        his_work_from,
        his_work_to,
        his_working_process,
        his_note,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].his_work_place = his_work_place;
        state[index].his_work_from = his_work_from;
        state[index].his_work_to = his_work_to;
        state[index].his_working_process = his_working_process;
        state[index].his_note = his_note;
      }
    },
    updateHistoryFailed2(state, action) {
      return [...state];
    },
    eraseHistory2() {
      return [];
    },
  },
});
export const {
  getHistory2,
  setHistory2,
  addHistory2,
  removeHistory2,
  removeHistorySuccess2,
  removeHistoryFailed2,
  updateHistory2,
  updateHistorySuccess2,
  updateHistoryFailed2,
  eraseHistory2,
} = historySlice2.actions;
export default historySlice2.reducer;
