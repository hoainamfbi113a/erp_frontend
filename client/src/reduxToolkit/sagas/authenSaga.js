import { func } from "prop-types";
import { all, call, takeLatest, put } from "redux-saga/effects";
import { getLogin, setLogin } from "reduxToolkit/features/authencationSlice";
import { login } from "apis/authenticationApi"
export default function* authenSaga() {
  yield all([yield takeLatest(getLogin.type, fetchLogin)]);
}
function* fetchLogin(action) {
  try {
    const resp = yield call(login, action.payload);
      yield put(setLogin({ ...resp }));
  } catch (error) {
    console.log(error);
  }
}
