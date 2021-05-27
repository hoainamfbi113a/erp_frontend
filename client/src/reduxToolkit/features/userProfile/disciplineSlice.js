import { createSlice, current } from "@reduxjs/toolkit";
const initialState = [];
const disciplineSlice = createSlice({
  name: "discipline",
  initialState: [],
  reducers: {
    getDiscipline() {},
    setDiscipline(state, action) {
      state = [...action.payload];
      return state;
    },
    addDiscipline(state, action) {
      return [...state];
    },
    
    removeDiscipline(state, action) {
      return [...state];
    },
    removeDisciplineSuccess(state, action) {
      const discipline = current(state);
      const { id } = action.payload;
      const existingDiscipline = discipline.find((discipline) => discipline.id == id);
      if (existingDiscipline) {
        return discipline.filter((discipline) => discipline.id != id);
      }
    },
    removeDisciplineFailed(state, action) {
      return [...state];
    },

    updateDiscipline(state, action) {
      return [...state];
    },
    updateDisciplineSuccess(state, action) {
      const discipline = current(state);
      const { id, rew_formality, rew_time_from, rew_time_to } = action.payload;
      const index = discipline.findIndex((discipline) => discipline.id === id);
      if (index >= 0) {
        state[index].rew_formality = rew_formality
        state[index].rew_time_from = rew_time_from
        state[index].rew_time_to = rew_time_to
      }
    },
    updateDisciplineFailed(state, action) {
        return [...state]
    },
  },
});
export const {
  getDiscipline,
  setDiscipline,
  addDiscipline,
  removeDiscipline,
  removeDisciplineSuccess,
  removeDisciplineFailed,
  updateDiscipline,
  updateDisciplineSuccess,
  updateDisciplineFailed,
} = disciplineSlice.actions;
export default disciplineSlice.reducer;
