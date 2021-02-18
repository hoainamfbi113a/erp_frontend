import { createSlice } from "@reduxjs/toolkit";
const authenSlice = createSlice({
  name: "authen",
  initialState: {},
  reducers: {
    getLogin() {},
    setLogin (state, action ){
        return {...state, ...action.payload}
    },
    Logout(){
        return {}
    },
  },
});
export const { getLogin, setLogin, Logout } = authenSlice.actions;
export default authenSlice.reducer;
