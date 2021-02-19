import { combineReducers } from "@reduxjs/toolkit";
import uiLoadingReducer from "./uiLoadingSlice";
import userReducer from "./userSlice";
import userProfileReducer from "./userProfileSlice";
import authenReducer from "./authencationSlice";
const reducer = combineReducers({
     uiLoading: uiLoadingReducer,
     user: userReducer,
     userProfile: userProfileReducer,
     authen:authenReducer,
});
export default reducer;
