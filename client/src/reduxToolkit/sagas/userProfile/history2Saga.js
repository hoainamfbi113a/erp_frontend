import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getHistory2,
  setHistory2,
  addHistory2,
  removeHistory2,
  removeHistorySuccess2,
  removeHistoryFailed2,
  updateHistory2,
  updateHistorySuccess2,
  updateHistoryFailed2,
} from "../../../reduxToolkit/features/userProfile/historySlice2";
import {
  getUserHistoryApi,
  addUserHistoryApi,
  removeUserHistoryApi,
  updateUserHistoryApi
} from "../../../apis/UserProfile/historyApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";

export default function* history2Saga() {
  yield all([yield takeLatest(getHistory2, fetchHistorySaga)]);
  yield all([yield takeLatest(addHistory2, addHistorySaga)]);
  yield all([yield takeLatest(removeHistory2, removeHistorySaga)]);
  yield all([yield takeLatest(updateHistory2, updateHistorySaga)]);
}

function* fetchHistorySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getUserHistoryApi, action.payload);
    console.log(resp);
    if (resp.message === "Successfully") {
      yield put(setHistory2([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addHistorySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addUserHistoryApi, action.payload);
    if (resp.message === "Success!. Stored") {
      message.success("Thêm việc làm thành công");
    } else {
      message.error("Thêm việc làm thất bại");
    }
  } catch (error) {
    message.error("Thêm việc làm thất bại");
  }
  yield put(hideLoading());
}

function* removeHistorySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeUserHistoryApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá việc làm thành công");
      yield put(removeHistorySuccess2(action.payload));
    } else {
      message.error("Xoá việc làm thất bại");
      yield put(removeHistoryFailed2(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateHistorySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateUserHistoryApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật việc làm thành công");
      yield put(updateHistorySuccess2(action.payload));
    } else {
      message.error("Cập nhật việc làm thất bại");
      yield put(updateHistoryFailed2(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
