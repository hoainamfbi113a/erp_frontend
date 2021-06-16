import { createSlice, current } from "@reduxjs/toolkit";
const socialSlice = createSlice({
  name: "social",
  initialState: [],
  reducers: {
    getSocial() {},
    setSocial(state, action) {
      state = [...action.payload];
      return state;
    },
    addSocial(state, action) {
      return [...state];
    },
    removeSocial(state, action) {
      return [...state];
    },
    removeSocialSuccess(state, action) {
      const data = current(state);
      const id = action.payload;
      console.log(id);
      const existingData = data.find((item) => item.id == id);
      if (existingData) {
        return data.filter((item) => item.id != id);
      }
    },
    removeSocialFailed(state, action) {
      return [...state];
    },
    updateSocial(state, action) {
      return [...state];
    },
    updateSocialSuccess(state, action) {
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
    updateSocialFailed(state, action) {
      return [...state];
    },
    eraseSocial() {
      return []
    }
  },
});
export const {
  getSocial,
  setSocial,
  addSocial,
  removeSocial,
  removeSocialSuccess,
  removeSocialFailed,
  updateSocial,
  updateSocialSuccess,
  updateSocialFailed,
  eraseSocial
} = socialSlice.actions;
export default socialSlice.reducer;
