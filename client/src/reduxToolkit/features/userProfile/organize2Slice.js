import { createSlice, current } from "@reduxjs/toolkit";
const organize2Slice = createSlice({
  name: "organize2",
  initialState: [],
  reducers: {
    getOrganize2() {},
    setOrganize2(state, action) {
      state = [...action.payload];
      return state;
    },
    addOrganize2(state, action) {
      return [...state];
    },
    removeOrganize2(state, action) {
      return [...state];
    },
    removeOrganize2Success(state, action) {
      const data = current(state);
      const {id} = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeOrganize2Failed(state, action) {
      return [...state];
    },
    updateOrganize2(state, action) {
      return [...state];
    },
    updateOrganize2Success(state, action) {
      const data = current(state);
      const {
        id,
        org_work_from,
        org_work_to,
        org_note,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].org_work_from = org_work_from;
        state[index].org_work_to = org_work_to;
        state[index].org_note = org_note;
      }
    }, 
    updateOrganize2Failed(state, action) {
      return [...state];
    },
    eraseOrganize2() {
      return [];
    },
  },
});
export const {
  getOrganize2,
  setOrganize2,
  addOrganize2,
  removeOrganize2,
  removeOrganize2Success,
  removeOrganize2Failed,
  updateOrganize2,
  updateOrganize2Success,
  updateOrganize2Failed,
  eraseOrganize2,
} = organize2Slice.actions;
export default organize2Slice.reducer;
