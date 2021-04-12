import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import userProfileSaga from "./userProfileSaga";
import authenSaga from "./authenSaga";
import permissionSaga from "./permissionSaga";
export function* rootSaga () {
    yield all([
        permissionSaga(),
        userSaga(),
        userProfileSaga(),
        authenSaga(),  
    ])
}
// export default rootSaga;
