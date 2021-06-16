import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getHistory,
  setHistory,
  addHistory,
  removeHistory,
  removeHistorySuccess,
  removeHistoryFailed,
  updateHistory,
  updateHistorySuccess,
  updateHistoryFailed,
} from "reduxToolkit/features/userProfile/HistorySlice";
import {
  getUserHistoryApi,
  addUserHistoryApi,
  removeUserHistoryApi,
  updateUserHistoryApi
} from "../../../apis/UserProfile/historyApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";

export default function* historySaga() {
  yield all([yield takeLatest(getHistory, fetchHistorySaga)]);
  yield all([yield takeLatest(addHistory, addHistorySaga)]);
  yield all([yield takeLatest(removeHistory, removeHistorySaga)]);
  yield all([yield takeLatest(updateHistory, updateHistorySaga)]);
}

function* fetchHistorySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getUserHistoryApi, action.payload);
    console.log(resp);
    if (resp.message === "Successfully") {
      yield put(setHistory([...resp.data]));
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
      message.success("Thêm lịch sử thành công");
    } else {
      message.error("Thêm lịch sử thất bại");
    }
  } catch (error) {
    message.error("Thêm lịch sử thất bại");
  }
  yield put(hideLoading());
}

function* removeHistorySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeUserHistoryApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá khen thưởng thành công");
      yield put(removeHistorySuccess(action.payload));
    } else {
      message.error("Xoá khen thưởng thất bại");
      yield put(removeHistoryFailed(action.payload));
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
      message.success("Cập nhật lịch sử thành công");
      yield put(updateHistorySuccess(action.payload));
    } else {
      message.error("Cập nhật lịch sử thất bại");
      yield put(updateHistoryFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
