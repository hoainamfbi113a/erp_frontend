import { createSlice, current } from "@reduxjs/toolkit";
const organizeSlice = createSlice({
  name: "organize",
  initialState: [],
  reducers: {
    getOrganize() {},
    setOrganize(state, action) {
      state = [...action.payload];
      return state;
    },
    addOrganize(state, action) {
      return [...state];
    },
    addOrganizeSuccess(state, action) {
      return [...state, action.payload];
    },
    removeOrganize(state, action) {
      return [...state];
    },
    removeOrganizeSuccess(state, action) {
      const data = current(state);
      const { id } = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeOrganizeFailed(state, action) {
      return [...state];
    },
    updateOrganize(state, action) {
      return [...state];
    },
    updateOrganizeSuccess(state, action) {
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
    updateOrganizeFailed(state, action) {
      return [...state];
    },
    eraseOrganize() {
      return [];
    },
  },
});
export const {
  getOrganize,
  setOrganize,
  addOrganize,
  addOrganizeSuccess,
  removeOrganize,
  removeOrganizeSuccess,
  removeOrganizeFailed,
  updateOrganize,
  updateOrganizeSuccess,
  updateOrganizeFailed,
  eraseOrganize,
} = organizeSlice.actions;
export default organizeSlice.reducer;
