import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getFamily,
  setFamily,
  addFamily,
} from "reduxToolkit/features/userProfile/familySlice";
import {
  getUserFamily,
  addUserFamily,
} from "../../../apis/UserProfile/familyApi";
import { message } from "antd";
export default function* rewardSaga() {
  yield all([yield takeLatest(getFamily, fetchFamilySaga)]);
  yield all([yield takeLatest(addFamily, addFamilySaga)]);
}
function* fetchFamilySaga(action) {
  try {
    const resp = yield call(getUserFamily, action.payload);
    if (resp.message === "Successfully") {
      yield put(setFamily([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
}
function* addFamilySaga(action) {
  try {
    const resp = yield call(addUserFamily, action.payload);
    if (resp.message === "Success!. Stored") {
      message.success("Thêm quan hệ thành công");
    } else {
      message.error("Thêm quan hệ thất bại");
    }
  } catch (error) {
    message.error("Thêm quan hệ thất bại");
  }
}
