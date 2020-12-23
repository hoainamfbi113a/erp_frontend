import {combineReducers} from "redux";
import userSixReducer from "./userSixReducer";
import uiReducer from "./ui"
const rootReducer = combineReducers({
    userSixReducer: userSixReducer,
    ui:uiReducer,
})
export default rootReducer;