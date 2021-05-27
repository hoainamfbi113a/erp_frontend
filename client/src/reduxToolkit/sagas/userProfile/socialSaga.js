import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getSocial,
  setSocial,
  addSocial,
  removeSocial,
  removeSocialSuccess,
  removeSocialFailed,
  updateSocial,
  updateSocialSuccess,
  updateSocialFailed
} from "../../features/userProfile/socialSlice";
import {
  getUserFamilyApi,
  addUserFamilyApi,
  removeUserFamilyApi,
  updateUserFamilyApi
} from "../../../apis/UserProfile/familyApi";
import { message } from "antd";
export default function* socialSaga() {
  yield all([yield takeLatest(getSocial, fetchSocialSaga)]);
  yield all([yield takeLatest(addSocial, addSocialSaga)]);
  yield all([yield takeLatest(removeSocial, removeSocialSaga)]);
  yield all([yield takeLatest(updateSocial, updateSocialSaga)]);
}

function* fetchSocialSaga(action) {
  try {
    const resp = yield call(getUserFamilyApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setSocial([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* addSocialSaga(action) {
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
}

function * removeSocialSaga(action){
  try {
    const resp = yield call(removeUserFamilyApi, action.payload);
    if(resp.message === "Success!. Deleted") {
      message.success("Xoá quan hệ thành công")
      yield put(removeSocialSuccess(action.payload));
      
    } else {
      message.error("Xoá quan hệ thất bại")
      yield put(removeSocialFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function * updateSocialSaga (action) {
  try {
    const resp = yield call(updateUserFamilyApi, action.payload);
    console.log(resp, action.payload);
    if(resp.message === "Success!. Updated") {
      message.success("Cập nhật quan hệ thành công")
      yield put(updateSocialSuccess(action.payload))
    } else {
      message.error("Cập nhật quan hệ thất bại")
      yield put(updateSocialFailed(action.payload))
    }
  } catch (error) {
    console.log(error)
  }
}
