import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getTraining,
  setTraining,
  addTraining,
  removeTraining,
  removeTrainingSuccess,
  removeTrainingFailed,
  updateTraining,
  updateTrainingSuccess,
  updateTrainingFailed,
} from "reduxToolkit/features/userProfile/trainingSlice";
import {
  getTrainingApi,
  addTrainingApi,
  removeTrainingApi,
  updateTrainingApi,
} from "../../../apis/UserProfile/trainingApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";

export default function* trainingSaga() {
  yield all([yield takeLatest(getTraining, fetchTrainingSaga)]);
  yield all([yield takeLatest(addTraining, addTrainingSaga)]);
  yield all([yield takeLatest(removeTraining, removeTrainingSaga)]);
  yield all([yield takeLatest(updateTraining, updateTrainingSaga)]);
}

function* fetchTrainingSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getTrainingApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setTraining([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addTrainingSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addTrainingApi, action.payload);
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

function* removeTrainingSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeTrainingApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá thông tin thành công");
      yield put(removeTrainingSuccess(action.payload));
    } else {
      message.error("Xoá thông tin thất bại");
      yield put(removeTrainingFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateTrainingSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateTrainingApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật thông tin thành công");
      yield put(updateTrainingSuccess(action.payload));
    } else {
      message.error("Cập nhật thông tin thất bại");
      yield put(updateTrainingFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
