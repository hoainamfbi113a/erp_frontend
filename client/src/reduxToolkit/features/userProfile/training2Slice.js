import { createSlice, current } from "@reduxjs/toolkit";
const training2Slice = createSlice({
  name: "training2",
  initialState: [],
  reducers: {
    getTraining2() {},
    setTraining2(state, action) {
      state = [...action.payload];
      return state;
    },
    addTraining2(state, action) {
      return [...state];
    },
    addTraining2Success(state, action) {
      return [...state, action.payload];
    },
    removeTraining2(state, action) {
      return [...state];
    },
    removeTraining2Success(state, action) {
      const data = current(state);
      const {id} = action.payload;
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeTraining2Failed(state, action) {
      return [...state];
    },
    updateTraining2(state, action) {
      return [...state];
    },
    updateTraining2Success(state, action) {
      const data = current(state);
      const {
        id,
        tra_time_from,
        tra_time_to,
        tra_note,
        tra_school_name,
        tra_study_time,
        tra_majors,
        tra_study_mode,
        tra_diploma,
        tra_address
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].tra_time_from = tra_time_from;
        state[index].tra_time_to = tra_time_to;
        state[index].tra_note = tra_note;
        state[index].tra_school_name = tra_school_name;
        state[index].tra_study_time = tra_study_time;
        state[index].tra_majors = tra_majors;
        state[index].tra_study_mode = tra_study_mode;
        state[index].tra_diploma = tra_diploma;
        state[index].tra_address = tra_address;
      }
    },
    updateTraining2Failed(state, action) {
      return [...state];
    },
    eraseTraining2() {
      return [];
    },
  },
});
export const {
  getTraining2,
  setTraining2,
  addTraining2,
  addTraining2Success,
  removeTraining2,
  removeTraining2Success,
  removeTraining2Failed,
  updateTraining2,
  updateTraining2Success,
  updateTraining2Failed,
  eraseTraining2,
} = training2Slice.actions;
export default training2Slice.reducer;
