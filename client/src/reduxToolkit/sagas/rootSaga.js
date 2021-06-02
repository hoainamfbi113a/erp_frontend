import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import userProfileSaga from "./userProfileSaga";
import authenSaga from "./authenSaga";
import permissionSaga from "./permissionSaga";
import rewardSaga from "./userProfile/rewardSaga";
import disciplineSaga from "./userProfile/disciplineSaga";
import familySaga from "./userProfile/familySaga";
import kinshipSaga from "./userProfile/kinshipSaga";
import socialSaga from "./userProfile/socialSaga";
import joinDCSSaga from "./userProfile/joinDCSSaga";

export function* rootSaga () {
    yield all([
        permissionSaga(),
        userSaga(),
        userProfileSaga(),
        authenSaga(),
        rewardSaga(),
        disciplineSaga(),
        familySaga(),
        kinshipSaga(),
        socialSaga(),
        joinDCSSaga(),
    ])
}
// export default rootSaga;
