import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"user",
    initialState: {},
    reducers:{
        getUser(){},
        setUser(state, action){
            return {...state, ...action.payload}
        }
    }
})
export const {getUser, setUser} = userSlice.actions;
export default userSlice.reducer;