import {createSlice} from "@reduxjs/toolkit"
const initialState = []
const rewardSlice = createSlice({
    name:"reward",
    initialState,
    reducers: {
        getReward(){},
        setReward(state, action){
            state = action.payload;
            return state
        },
        addReward(state, action){
            state.push(action.payload)
        }
    }
})
export const { getReward, setReward, addReward} = rewardSlice.actions
export default rewardSlice.reducer