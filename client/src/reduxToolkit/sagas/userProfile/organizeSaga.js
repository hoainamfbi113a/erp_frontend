import { all, call, takeLatest, put, select } from "redux-saga/effects";
import {
  getOrganize,
  setOrganize,
  addOrganize,
  addOrganizeSuccess,
  removeOrganize,
  removeOrganizeSuccess,
  removeOrganizeFailed,
  updateOrganize,
  updateOrganizeSuccess,
  updateOrganizeFailed,
} from "../../../reduxToolkit/features/userProfile/organizeSlice";
import {
  removeOrganize2Success,
} from "../../../reduxToolkit/features/userProfile/organize2Slice";
import {
  getOrganizeApi,
  addOrganizeApi,
  removeOrganizeApi,
  updateOrganizeApi,
} from "../../../apis/UserProfile/organizeApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { message } from "antd";

const getProject = (state) => state.organize2User
export default function* organizeSaga() {
  yield all([yield takeLatest(getOrganize, fetchOrganizeSaga)]);
  yield all([yield takeLatest(addOrganize, addOrganizeSaga)]);
  yield all([yield takeLatest(removeOrganize, removeOrganizeSaga)]);
  yield all([yield takeLatest(updateOrganize, updateOrganizeSaga)]);
}

function* fetchOrganizeSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getOrganizeApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setOrganize([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* addOrganizeSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addOrganizeApi, action.payload);
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

function* removeOrganizeSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeOrganizeApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá thông tin thành công");
      yield put(removeOrganizeSuccess(action.payload));
    } else {
      message.error("Xoá thông tin thất bại");
      yield put(removeOrganizeFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}

function* updateOrganizeSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateOrganizeApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật thông tin thành công");
      // yield put(updateOrganizeSuccess(action.payload));
      let organizes = yield select(getProject);
      const existingOrganize = organizes.find((organize) => organize.id == action.payload.id);
      if(existingOrganize) {
        yield put(updateOrganizeSuccess(action.payload));
      } else {
            yield put (removeOrganize2Success(action.payload))
            yield put (addOrganizeSuccess(action.payload))
      }
    } else {
      message.error("Cập nhật thông tin thất bại");
      yield put(updateOrganizeFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
