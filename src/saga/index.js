import { all } from "redux-saga/effects";
import userSaga from "./userSaga"
import userBaseSaga from "./userBaseSaga"
import userDegreeSaga from "./userDegreeSaga"
import userDepartmentSaga from "./userDepartmentSaga"
import userJournalistCardSaga from "./userJournalistCardSaga"
import userPersonalHistorySaga from "./userPersonalHistorySaga"
import userWorkObjectSaga from "./userWorkObjectSaga"
import userSixSaga from "./userSixSaga"
function* rootSaga () {
    yield all([
        userSaga(),
        userBaseSaga(),
        userDegreeSaga(),
        userDepartmentSaga(),
        userJournalistCardSaga(),
        userPersonalHistorySaga(),
        userWorkObjectSaga(),
        userSixSaga(),
    ])
}
export default rootSaga;