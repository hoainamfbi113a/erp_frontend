import { createSlice, current } from "@reduxjs/toolkit";
const initialState = [];
const rewardSlice = createSlice({
  name: "reward",
  initialState: [],
  reducers: {
    getReward() {},
    setReward(state, action) {
      state = [...action.payload];
      return state;
    },
    addReward(state, action) {
      return [...state];
    },

    removeReward(state, action) {
      return [...state];
    },
    removeRewardSuccess(state, action) {
      const rewards = current(state);
      const { id } = action.payload;
      const existingReward = rewards.find((reward) => reward.id == id);
      if (existingReward) {
        return rewards.filter((reward) => reward.id != id);
      }
    },
    removeRewardFailed(state, action) {
      return [...state];
    },

    updateReward(state, action) {
      return [...state];
    },
    updateRewardSuccess(state, action) {
      const rewards = current(state);
      const { id, rew_formality, rew_time_from, rew_time_to } = action.payload;
      let existingReward = rewards.find((reward) => reward.id === id);
      if (existingReward) {
        existingReward.rew_formality = rew_formality;
        existingReward.rew_time_from = rew_time_from;
        existingReward.rew_time_to = rew_time_to;
      }
    },
    updateRewardFailed(state, action) {
        return [...state]
    },
  },
});
export const {
  getReward,
  setReward,
  addReward,
  removeReward,
  removeRewardSuccess,
  removeRewardFailed,
  updateReward,
  updateRewardSuccess,
  updateRewardFailed,
} = rewardSlice.actions;
export default rewardSlice.reducer;
