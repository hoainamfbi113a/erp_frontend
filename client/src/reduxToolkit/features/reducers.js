import { combineReducers } from "@reduxjs/toolkit";
import uiLoadingReducer from "./uiLoadingSlice";
import userReducer from "./userSlice";
import userProfileReducer from "./userProfileSlice";
import authenReducer from "./authencationSlice";
import permissionReducer from "./permissionSlice";
import rewardSlice from "./userProfile/rewardSlice";
import familySlice from "./userProfile/familySlice";
import kinshipSlice from "./userProfile/kinshipSlice";
import socialSlice from "./userProfile/socialSlice";

const reducer = combineReducers({
     uiLoading: uiLoadingReducer,
     user: userReducer,
     userProfile: userProfileReducer,
     authen: authenReducer,
     permission: permissionReducer,
     rewardUser: rewardSlice,
     familyUser: familySlice,
     kinshipUser: kinshipSlice,
     socialUser: socialSlice,
});
export default reducer;
