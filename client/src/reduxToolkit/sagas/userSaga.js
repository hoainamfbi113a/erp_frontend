import { func } from "prop-types";
import { all, call, takeLatest, put } from "redux-saga/effects";
import { getUser, setUser } from "reduxToolkit/features/userSlice";
import { getUserApi } from "apis/authenticationApi"
export default function* userSaga() {
  yield all([yield takeLatest(getUser.type, fetchUser)]);
}
function* fetchUser(action) {
  try {
    const resp = yield call(getUserApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setUser({ ...resp.data }));
    }
  } catch (error) {
    console.log(error);
  }
}
