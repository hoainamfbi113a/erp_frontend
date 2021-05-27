import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import userProfileSaga from "./userProfileSaga";
import authenSaga from "./authenSaga";
import permissionSaga from "./permissionSaga";
import rewardSaga from "./userProfile/rewardSaga";
import familySaga from "./userProfile/familySaga";
import kinshipSaga from "./userProfile/kinshipSaga";

export function* rootSaga () {
    yield all([
        permissionSaga(),
        userSaga(),
        userProfileSaga(),
        authenSaga(),
        rewardSaga(), 
        familySaga(),
        kinshipSaga(),
    ])
}
// export default rootSaga;
