import { all } from "redux-saga/effects";
import userSixSaga from "./userSixSaga"
import roleSaga from "./roleSaga";
function* rootSaga () {
    yield all([
        userSixSaga(),
        roleSaga(),
    ])
}
export default rootSaga;