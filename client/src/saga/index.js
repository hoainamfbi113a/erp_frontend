import { all } from "redux-saga/effects";
import userSixSaga from "./userSixSaga"
function* rootSaga () {
    yield all([
        userSixSaga(),
    ])
}
export default rootSaga;