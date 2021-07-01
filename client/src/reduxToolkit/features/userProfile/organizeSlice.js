import { createSlice, current } from "@reduxjs/toolkit";
const organizeSlice = createSlice({
  name: "organize",
  initialState: [],
  reducers: {
    getOrganize() { },
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
        org_time_from,
        org_time_to,
        org_type,
        org_note,
        org_name,
        org_headquarters_where,
        org_position,
        org_youth_team,
        org_youth_group,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].org_time_from = org_time_from;
        state[index].org_time_to = org_time_to;
        state[index].org_type = org_type;
        state[index].org_note = org_note;
        state[index].org_name = org_name;
        state[index].org_headquarters_where = org_headquarters_where;
        state[index].org_position = org_position;
        state[index].org_youth_team = org_youth_team;
        state[index].org_youth_group = org_youth_group;
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
