import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import userProfileSaga from "./userProfileSaga";
import authenSaga from "./authenSaga";
export function* rootSaga () {
    yield all([
        userSaga(),
        userProfileSaga(),
        authenSaga(),
    ])
}
// export default rootSaga;
