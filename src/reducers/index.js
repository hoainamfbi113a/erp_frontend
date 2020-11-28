import {combineReducers} from "redux";
import postReducer from "./PostReducer"
import userReducer from "./userReducer";
import userBaseReducer from "./userBaseReducer";
import userDegreeReducer from "./userDegreeReducer";
import userDepartmentReducer from "./userDepartmentReducer";
import userJournalistCardReducer from "./userJournalistCardReducer";
import userPersonalHistoryReducer from "./userPersonalHistoryReducer";
import userWorkObjectReducer from "./userWorkObjectReducer";
const rootReducer = combineReducers({
    postReducer:postReducer,
    userReducer: userReducer,
    userBaseReducer: userBaseReducer,
    userDegreeReducer: userDegreeReducer,
    userDepartmentReducer: userDepartmentReducer,
    userJournalistCardReducer: userJournalistCardReducer,
    userPersonalHistoryReducer: userPersonalHistoryReducer,
    userWorkObjectReducer: userWorkObjectReducer
})
export default rootReducer;