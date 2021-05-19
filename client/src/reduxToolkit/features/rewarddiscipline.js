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
        },
        addReward(state, action){
            state.push(action.payload)
        },
        removeReward(state, action) {
            const { id } = action.payload
            const existingReward = state.find((reward)=>{
                reward.id === id
            })
            if(existingReward) {
                return state.filter((reward)=>{
                    reward.id !==id
                })
            }
        }
    }
})
export const { getReward, setReward, addReward, removeReward } = rewardDiscipline.actions
export default rewardDiscipline.reducer