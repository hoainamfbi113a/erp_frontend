import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getJoinDCS,
  setJoinDCS,
  addJoinDCS,
  removeJoinDCS,
  removeJoinDCSSuccess,
  removeJoinDCSFailed,
  updateJoinDCS,
  updateJoinDCSSuccess,
  updateJoinDCSFailed,
} from "reduxToolkit/features/userProfile/joinDCSSlice";
import {
  getJoinDCSApi,
  addJoinDCSApi,
  removeJoinDCSApi,
  updateJoinDCSApi,
} from "apis/UserProfile/joinDCSApi";
import { message } from "antd";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
export default function* rewardSaga() {
  yield all([yield takeLatest(getJoinDCS, fetchJoinDCSSaga)]);
  yield all([yield takeLatest(addJoinDCS, addJoinDCSSaga)]);
  yield all([yield takeLatest(removeJoinDCS, removeJoinDCSSaga)]);
  yield all([yield takeLatest(updateJoinDCS, updateJoinDCSSaga)]);
}
function* fetchJoinDCSSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getJoinDCSApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setJoinDCS(resp.data));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
function* addJoinDCSSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addJoinDCSApi, action.payload);
    if (resp.message === "Success!. Stored") {
      message.success("Thêm khen thưởng thành công");
    } else {
      message.error("Thêm khen thưởng thất bại");
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại");
  }
  yield put(hideLoading());
}
function* removeJoinDCSSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeJoinDCSApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá khen thưởng thành công");
      yield put(removeJoinDCSSuccess(action.payload));
    } else {
      message.error("Xoá khen thưởng thất bại");
      yield put(removeJoinDCSFailed(action.payload));
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại");
  }
  yield put(hideLoading());
}

function* updateJoinDCSSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateJoinDCSApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật DCS thành công");
      yield put(updateJoinDCSSuccess(action.payload));
    } else {
      message.error("Cập nhật khen thưởng thất bại");
      yield put(updateJoinDCSFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
