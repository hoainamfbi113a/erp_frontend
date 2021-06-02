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
import historySaga from "./userProfile/historySaga";
import trainingSaga from "./userProfile/trainingSaga";
import training2Saga from "./userProfile/training2Saga";
import organizeSaga from "./userProfile/organizeSaga";
import organize2Saga from "./userProfile/organize2Saga";

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
        historySaga(),
        trainingSaga(),
        training2Saga(),
        organizeSaga(),
        organize2Saga(),
    ])
}
// export default rootSaga;
