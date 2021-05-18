import {createSlice} from "@reduxjs/toolkit"
const initialState = []
const rewardDiscipline = createSlice({
    name:"reward",
    initialState,
    reducers: {
        getReward(){},
        setReward(state, action){
            state = action.payload;
            return state
        }
    }
})
export const { getReward, setReward} = rewardDiscipline.actions
export default rewardDiscipline.reducer