import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getKinship,
  setKinship,
  addKinship,
  removeKinship,
  removeKinshipSuccess,
  removeKinshipFailed,
  updateKinship,
  updateKinshipSuccess,
  updateKinshipFailed,
} from "../../features/userProfile/kinshipSlice";
import {
  getUserFamilyApi,
  addUserFamilyApi,
  removeUserFamilyApi,
  updateUserFamilyApi,
} from "../../../apis/UserProfile/familyApi";
import { message } from "antd";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";

export default function* kinshipSaga() {
  yield all([yield takeLatest(getKinship, fetchKinshipSaga)]);
  yield all([yield takeLatest(addKinship, addKinshipSaga)]);
  yield all([yield takeLatest(removeKinship, removeKinshipSaga)]);
  yield all([yield takeLatest(updateKinship, updateKinshipSaga)]);
}

function* fetchKinshipSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getUserFamilyApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setKinship([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addKinshipSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addUserFamilyApi, action.payload);
    if (resp.message === "Success!. Stored") {
      message.success("Thêm quan hệ thành công");
    } else {
      message.error("Thêm quan hệ thất bại");
    }
  } catch (error) {
    message.error("Thêm quan hệ thất bại");
  }
  yield put(hideLoading());
}

function* removeKinshipSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeUserFamilyApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá quan hệ thành công");
      yield put(removeKinshipSuccess(action.payload));
    } else {
      message.error("Xoá quan hệ thất bại");
      yield put(removeKinshipFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateKinshipSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateUserFamilyApi, action.payload);
    console.log(resp, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật quan hệ thành công");
      yield put(updateKinshipSuccess(action.payload));
    } else {
      message.error("Cập nhật quan hệ thất bại");
      yield put(updateKinshipFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
