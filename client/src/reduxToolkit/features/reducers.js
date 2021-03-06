import { combineReducers } from "@reduxjs/toolkit";
import uiLoadingReducer from "./uiLoadingSlice";
import userReducer from "./userSlice";
import userProfileReducer from "./userProfileSlice";
import authenReducer from "./authencationSlice";
import permissionReducer from "./permissionSlice";
import rewardSlice from "./userProfile/rewardSlice";
import disciplineSlice from "./userProfile/disciplineSlice";
import familySlice from "./userProfile/familySlice";
import kinshipSlice from "./userProfile/kinshipSlice";
import socialSlice from "./userProfile/socialSlice";
import joinDCSSlice from "./userProfile/joinDCSSlice";
import historySlice from "./userProfile/historySlice";
import history2Slice from "./userProfile/historySlice2";
import trainingSlice from "./userProfile/trainingSlice";
import training2Slice from "./userProfile/training2Slice";
import organizeSlice from "./userProfile/organizeSlice";
import organize2Slice from "./userProfile/organize2Slice";
import abroadSlice from "./userProfile/abroadSlice";

const reducer = combineReducers({
     uiLoading: uiLoadingReducer,
     user: userReducer,
     userProfile: userProfileReducer,
     authen: authenReducer,
     permission: permissionReducer,
     rewardUser: rewardSlice,
     disciplineUser: disciplineSlice,
     familyUser: familySlice,
     kinshipUser: kinshipSlice,
     socialUser: socialSlice,
     joinDCSUser: joinDCSSlice,
     historyUser: historySlice,
     history2User: history2Slice,
     trainingUser: trainingSlice,
     training2User: training2Slice,
     organizeUser: organizeSlice,
     organize2User: organize2Slice,
     abroadUser: abroadSlice
});
export default reducer;
