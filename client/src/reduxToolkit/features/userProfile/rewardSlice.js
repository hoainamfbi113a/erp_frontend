import {createSlice, current} from "@reduxjs/toolkit"
const initialState = []
const rewardSlice = createSlice({
    name:"reward",
    initialState:[],
    reducers: {
        getReward(){},
        setReward(state, action){
            state = [...action.payload];
            return state
            
        },
        addReward(state, action){
            return [...state]
        },
        
        removeReward(state, action) {
            return [...state]
        },
        removeRewardSuccess(state, action) {
            const  rewards  = current(state);
            const { id } = action.payload;
            const existingReward = rewards.find((reward)=>
                reward.id == id
            )
            // console.log(existingReward)
            if(existingReward) {
                return rewards.filter((reward)=>
                    reward.id != id
                )
            }
        },
        removeRewardFailed(state, action) {
          return [...state];  
        },

    }
})
export const { getReward, setReward, addReward, removeReward, removeRewardSuccess, removeRewardFailed} = rewardSlice.actions
export default rewardSlice.reducer