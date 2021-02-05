import { combineReducers } from "@reduxjs/toolkit";
import uiLoadingReducer from "./uiLoadingSlice";
const reducer = combineReducers({
     uiLoading: uiLoadingReducer
});
export default reducer;
