import { createSlice } from "@reduxjs/toolkit";
const userProfileSlice = createSlice({
    name:"userProfile",
    initialState: {},
    reducers: {
        getUserProfile(){},
        setUserProfile (state, action ){
            return {...state, ...action.payload}
        }
    }
})
export const {getUserProfile, setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;