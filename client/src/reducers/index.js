import {combineReducers} from "redux";
import userSixReducer from "./userSixReducer";
import uiReducer from "./ui"
import roleReducer from "./RoleReducer";
const rootReducer = combineReducers({
    userSixReducer: userSixReducer,
    ui:uiReducer,
    roleReducer,
})
export default rootReducer;