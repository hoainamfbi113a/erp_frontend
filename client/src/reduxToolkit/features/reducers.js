import { combineReducers } from "@reduxjs/toolkit";
import uiLoadingReducer from "./uiLoadingSlice";
import userReducer from "./userSlice";
import userProfileReducer from "./userProfileSlice";
import authenReducer from "./authencationSlice";
import permissionReducer from "./permissionSlice";
import rewardSlice from "./userProfile/rewardSlice";
import familySlice from "./userProfile/familySlice";

const reducer = combineReducers({
     uiLoading: uiLoadingReducer,
     user: userReducer,
     userProfile: userProfileReducer,
     authen: authenReducer,
     permission: permissionReducer,
     rewardUser: rewardSlice,
     familyUser: familySlice,
});
export default reducer;
