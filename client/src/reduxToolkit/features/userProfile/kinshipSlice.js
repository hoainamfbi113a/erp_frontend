import { createSlice, current } from "@reduxjs/toolkit";
const kinshipSlice = createSlice({
  name: "kinship",
  initialState: [],
  reducers: {
    getKinship() {},
    setKinship(state, action) {
      state = [...action.payload];
      return state;
    },
    addKinship(state, action) {
      return [...state];
    },
    removeKinship(state, action) {
      return [...state];
    },
    removeKinshipSuccess(state, action) {
      const data = current(state);
      const id = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeKinshipFailed(state, action) {
      return [...state];
    },
    updateKinship(state, action) {
      return [...state];
    },
    updateKinshipSuccess(state, action) {
      const data = current(state);
      const {
        id,
        rem_relationship,
        rem_full_name,
        rem_note,
        rem_job,
      } = action.payload;
      const index = data.findIndex((item) => item.id === id);
      if (index >= 0) {
        state[index].rem_relationship = rem_relationship;
        state[index].rem_full_name = rem_full_name;
        state[index].rem_note = rem_note;
        state[index].rem_job = rem_job;
      }
    },
    updateKinshipFailed(state, action) {
      return [...state];
    },
    eraseKinship() {
      return []
    }
  },
});
export const {
  getKinship,
  setKinship,
  addKinship,
  removeKinship,
  removeKinshipSuccess,
  removeKinshipFailed,
  updateKinship,
  updateKinshipSuccess,
  updateKinshipFailed,
  eraseKinship
} = kinshipSlice.actions;
export default kinshipSlice.reducer;
