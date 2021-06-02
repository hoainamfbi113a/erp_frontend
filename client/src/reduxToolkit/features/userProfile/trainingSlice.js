import { createSlice, current } from "@reduxjs/toolkit";
const trainingSlice = createSlice({
  name: "training",
  initialState: [],
  reducers: {
    getTraining() {},
    setTraining(state, action) {
      state = [...action.payload];
      return state;
    },
    addTraining(state, action) {
      return [...state];
    },
    removeTraining(state, action) {
      return [...state];
    },
    removeTrainingSuccess(state, action) {
      const data = current(state);
      const id = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeTrainingFailed(state, action) {
      return [...state];
    },
    updateTraining(state, action) {
      return [...state];
    },
    updateTrainingSuccess(state, action) {
      const data = current(state);
      const {
        id,
        tra_work_from,
        tra_work_to,
        tra_note,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].tra_work_from = tra_work_from;
        state[index].tra_work_to = tra_work_to;
        state[index].tra_note = tra_note;
      }
    }, 
    updateTrainingFailed(state, action) {
      return [...state];
    },
    eraseTraining() {
      return [];
    },
  },
});
export const {
  getTraining,
  setTraining,
  addTraining,
  removeTraining,
  removeTrainingSuccess,
  removeTrainingFailed,
  updateTraining,
  updateTrainingSuccess,
  updateTrainingFailed,
  eraseTraining,
} = trainingSlice.actions;
export default trainingSlice.reducer;
