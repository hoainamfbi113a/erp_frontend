import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import userProfileSaga from "./userProfileSaga";
import authenSaga from "./authenSaga";
import permissionSaga from "./permissionSaga";
import rewardSaga from "./userProfile/rewardSaga";
import familySaga from "./userProfile/familySaga";
import kinshipSaga from "./userProfile/kinshipSaga";
import socialSaga from "./userProfile/socialSaga";

export function* rootSaga () {
    yield all([
        permissionSaga(),
        userSaga(),
        userProfileSaga(),
        authenSaga(),
        rewardSaga(), 
        familySaga(),
        kinshipSaga(),
        socialSaga(),
    ])
}
// export default rootSaga;
