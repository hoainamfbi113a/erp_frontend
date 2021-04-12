import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"user",
    initialState: null,
    reducers:{
        getUser(){},
        setUser(state, action){
            return action.payload
        }
    }
})
export const {getUser, setUser} = userSlice.actions;
export default userSlice.reducer;