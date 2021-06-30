import { all, call, takeLatest, put, select } from "redux-saga/effects";
import {
  getTraining2,
  setTraining2,
  addTraining2,
  addTraining2Success,
  removeTraining2,
  removeTraining2Success,
  removeTraining2Failed,
  updateTraining2,
  updateTraining2Success,
  updateTraining2Failed,
} from "../../../reduxToolkit/features/userProfile/training2Slice";
import {
  removeTrainingSuccess,
} from "reduxToolkit/features/userProfile/trainingSlice";
import {
  getTrainingApi,
  addTrainingApi,
  removeTrainingApi,
  updateTrainingApi,
} from "../../../apis/UserProfile/trainingApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";
const getProject = (state) => state.training2User
export default function* training2Saga() {
  yield all([yield takeLatest(getTraining2, fetchTraining2Saga)]);
  yield all([yield takeLatest(addTraining2, addTraining2Saga)]);
  yield all([yield takeLatest(removeTraining2, removeTraining2Saga)]);
  yield all([yield takeLatest(updateTraining2, updateTraining2Saga)]);
}

function* fetchTraining2Saga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getTrainingApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setTraining2([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addTraining2Saga(action) {
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

function* removeTraining2Saga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeTrainingApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá thông tin thành công");
      yield put(removeTraining2Success(action.payload));
    } else {
      message.error("Xoá thông tin thất bại");
      yield put(removeTraining2Failed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateTraining2Saga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateTrainingApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật thông tin thành công");
      // yield put(updateTraining2Success(action.payload));
      let training2s = yield select(getProject);
      const existingTraining2 = training2s.find((training2) => training2.id == action.payload.id);
      if(existingTraining2) {
        yield put(updateTraining2Success(action.payload));
      } else {
            yield put (removeTrainingSuccess(action.payload))
            yield put (addTraining2Success(action.payload))
      }

    } else {
      message.error("Cập nhật thông tin thất bại");
      yield put(updateTraining2Failed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
