import { all, call, takeLatest, put} from "redux-saga/effects";
import {getUserProfile, setUserProfile } from "reduxToolkit/features/userProfileSlice";
import { getProfile } from "apis/profileApi";
export default function* userProfileSaga() {
    yield all ([yield takeLatest(getUserProfile.type, fetchUserProfile)]);
}

function* fetchUserProfile (action) {
    try {
        const resp = yield call(getProfile, action.payload);
        if(resp.message === "Successfully") {
            yield put(setUserProfile({...resp.data}))
        }
    } catch (error) {
        console.log(error)
    }
}
 