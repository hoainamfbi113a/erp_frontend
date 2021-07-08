import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getAbroad,
  setAbroad,
  addAbroad,
  removeAbroad,
  removeAbroadSuccess,
  removeAbroadFailed,
  updateAbroad,
  updateAbroadSuccess,
  updateAbroadFailed,
} from "../../../reduxToolkit/features/userProfile/abroadSlice";
import {
  getUserAbroadApi,
  addUserAbroadApi,
  removeUserAbroadApi,
  updateUserAbroadApi,
} from "../../../apis/UserProfile/abroadApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";

export default function* abroadSaga() {
  yield all([yield takeLatest(getAbroad, fetchAbroadSaga)]);
  yield all([yield takeLatest(addAbroad, addAbroadSaga)]);
  yield all([yield takeLatest(removeAbroad, removeAbroadSaga)]);
  yield all([yield takeLatest(updateAbroad, updateAbroadSaga)]);
}

function* fetchAbroadSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getUserAbroadApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setAbroad([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addAbroadSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addUserAbroadApi, action.payload);
    if (resp.message === "Success!. Stored") {
      message.success("Thêm thông tin thành công");
    } else {
      message.error("Thêm thông tin thất bại");
    }
  } catch (error) {
    message.error("Thêm thông tin thất bại");
  }
  yield put(hideLoading());
}

function* removeAbroadSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeUserAbroadApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá thông tin thành công");
      yield put(removeAbroadSuccess(action.payload));
    } else {
      message.error("Xoá thông tin thất bại");
      yield put(removeAbroadFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateAbroadSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateUserAbroadApi, action.payload);
    console.log(resp, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật thông tin thành công");
      yield put(updateAbroadSuccess(action.payload));
    } else {
      message.error("Cập nhật thông tin thất bại");
      yield put(updateAbroadFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
