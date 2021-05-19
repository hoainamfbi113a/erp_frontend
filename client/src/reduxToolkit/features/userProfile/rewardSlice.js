import {createSlice} from "@reduxjs/toolkit"
const initialState = []
const rewardSlice = createSlice({
    name:"reward",
    initialState:{
        rewards:[]
    },
    reducers: {
        getReward(){},
        setReward(state, action){
            state = [...state.rewards, ...action.payload];
            console.log(state)
            return state
            
        },
        addReward(state, action){
            state.push(action.payload)
        },
        removeReward(state, action) {
            console.log("state",state)
            const { id } = action.payload;
            console.log(id)

            const existingReward = state.find((reward)=>{
                reward.id == id
            })
            if(existingReward) {
                return state.filter((reward)=>{
                    reward.id != id
                })
            }
        }
    }
})
export const { getReward, setReward, addReward, removeReward} = rewardSlice.actions
export default rewardSlice.reducer