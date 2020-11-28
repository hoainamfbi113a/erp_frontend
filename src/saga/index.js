import { all } from "redux-saga/effects";
import userSaga from "./userSaga"
import userBaseSaga from "./userBaseSaga"
import userDegreeSaga from "./userDegreeSaga"
import userDepartmentSaga from "./userDepartmentSaga"
import userJournalistCardSaga from "./userJournalistCardSaga"
import userPersonalHistorySaga from "./userPersonalHistorySaga"
import userWorkObjectSaga from "./userWorkObjectSaga"
function* rootSaga () {
    yield all([
        userSaga(),
        userBaseSaga(),
        userDegreeSaga(),
        userDepartmentSaga(),
        userJournalistCardSaga(),
        userPersonalHistorySaga(),
        userWorkObjectSaga(),
    ])
}
export default rootSaga;