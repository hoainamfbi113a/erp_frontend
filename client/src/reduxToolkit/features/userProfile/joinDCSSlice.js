import { createSlice, current } from "@reduxjs/toolkit";
const initialState = [];
const joinDCSSlice = createSlice({
  name: "joinDCS",
  initialState: {},
  reducers: {
    getJoinDCS() {},
    setJoinDCS(state, action) {
      state = action.payload;
      return state;
    },
    addJoinDCS(state, action) {
      return [...state];
    },

    removeJoinDCS(state, action) {
      return [...state];
    },
    removeJoinDCSSuccess(state, action) {
      const joinDCS = current(state);
      const { id } = action.payload;
      const existingJoinDCS = joinDCS.find((joinDCS) => joinDCS.id == id);
      if (existingJoinDCS) {
        return joinDCS.filter((joinDCS) => joinDCS.id != id);
      }
    },
    removeJoinDCSFailed(state, action) {
      return [...state];
    },

    updateJoinDCS(state, action) {
      return [...state];
    },
    updateJoinDCSSuccess(state, action) {
      const joinDCS = current(state);
      const { id, rew_formality, rew_time_from, rew_time_to } = action.payload;
      const index = joinDCS.findIndex((joinDCS) => joinDCS.id === id);
      if (index >= 0) {
        state[index].rew_formality = rew_formality
        state[index].rew_time_from = rew_time_from
        state[index].rew_time_to = rew_time_to
      }
    },
    updateJoinDCSFailed(state, action) {
        return [...state]
    },
  },
});
export const {
  getJoinDCS,
  setJoinDCS,
  addJoinDCS,
  removeJoinDCS,
  removeJoinDCSSuccess,
  removeJoinDCSFailed,
  updateJoinDCS,
  updateJoinDCSSuccess,
  updateJoinDCSFailed,
} = joinDCSSlice.actions;
export default joinDCSSlice.reducer;
