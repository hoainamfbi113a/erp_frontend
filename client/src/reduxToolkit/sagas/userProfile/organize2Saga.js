import { all, call, takeLatest, put, select } from "redux-saga/effects";
import {
  getOrganize2,
  setOrganize2,
  addOrganize2,
  addOrganize2Success,
  removeOrganize2,
  removeOrganize2Success,
  removeOrganize2Failed,
  updateOrganize2,
  updateOrganize2Success,
  updateOrganize2Failed,
} from "../../../reduxToolkit/features/userProfile/organize2Slice";
import {
  removeOrganizeSuccess,
} from "../../../reduxToolkit/features/userProfile/organizeSlice";
import {
  getOrganizeApi,
  addOrganizeApi,
  removeOrganizeApi,
  updateOrganizeApi,
} from "../../../apis/UserProfile/organizeApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";

const getProject = (state) => state.organize2User
export default function* organize2Saga() {
  yield all([yield takeLatest(getOrganize2, fetchOrganize2Saga)]);
  yield all([yield takeLatest(addOrganize2, addOrganize2Saga)]);
  yield all([yield takeLatest(removeOrganize2, removeOrganize2Saga)]);
  yield all([yield takeLatest(updateOrganize2, updateOrganize2Saga)]);
}

function* fetchOrganize2Saga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getOrganizeApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setOrganize2([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addOrganize2Saga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addOrganizeApi, action.payload);
    console.log(resp);
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

function* removeOrganize2Saga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeOrganizeApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá thông tin thành công");
      yield put(removeOrganize2Success(action.payload));
    } else {
      message.error("Xoá thông tin thất bại");
      yield put(removeOrganize2Failed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateOrganize2Saga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateOrganizeApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật thông tin thành công");
      // yield put(updateOrganize2Success(action.payload));
      let organizes2 = yield select(getProject);
      const existingOrganize2 = organizes2.find((organize2) => organize2.id == action.payload.id);
      if(existingOrganize2) {
        yield put(updateOrganize2Success(action.payload));
      } else {
            yield put (removeOrganizeSuccess(action.payload))
            yield put (addOrganize2Success(action.payload))
      }
    } else {
      message.error("Cập nhật thông tin thất bại");
      yield put(updateOrganize2Failed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
