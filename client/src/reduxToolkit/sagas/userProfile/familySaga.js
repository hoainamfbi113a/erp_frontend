import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getFamily,
  setFamily,
  addFamily,
  removeFamily,
  removeFamilySuccess,
  removeFamilyFailed,
  updateFamily,
  updateFamilySuccess,
  updateFamilyFailed,
} from "reduxToolkit/features/userProfile/familySlice";
import {
  getUserFamilyApi,
  addUserFamilyApi,
  removeUserFamilyApi,
  updateUserFamilyApi,
} from "../../../apis/UserProfile/familyApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";

export default function* familySaga() {
  yield all([yield takeLatest(getFamily, fetchFamilySaga)]);
  yield all([yield takeLatest(addFamily, addFamilySaga)]);
  yield all([yield takeLatest(removeFamily, removeFamilySaga)]);
  yield all([yield takeLatest(updateFamily, updateFamilySaga)]);
}

function* fetchFamilySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getUserFamilyApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setFamily([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addFamilySaga(action) {
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

function* removeFamilySaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeUserFamilyApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá khen thưởng thành công");
      yield put(removeFamilySuccess(action.payload));
    } else {
      message.error("Xoá khen thưởng thất bại");
      yield put(removeFamilyFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateFamilySaga(action) {
  try {
    const resp = yield call(updateUserFamilyApi, action.payload);
    console.log(resp, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật quan hệ thành công");
      yield put(updateFamilySuccess(action.payload));
    } else {
      message.error("Cập nhật quan hệ thất bại");
      yield put(updateFamilyFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
