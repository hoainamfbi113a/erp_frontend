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
import historySaga from "./userProfile/historySaga";
import historySaga2 from "./userProfile/history2Saga";
import trainingSaga from "./userProfile/trainingSaga";
import training2Saga from "./userProfile/training2Saga";
import organizeSaga from "./userProfile/organizeSaga";
import organize2Saga from "./userProfile/organize2Saga";
import abroadSaga from "./userProfile/abroadSaga";

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
        historySaga(),
        historySaga2(),
        trainingSaga(),
        training2Saga(),
        organizeSaga(),
        organize2Saga(),
        abroadSaga()
    ])
}
// export default rootSaga;
