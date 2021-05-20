import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getFamily,
  setFamily,
  addFamily,
  removeFamily,
  removeFamilySuccess,
  removeFamilyFailed,
} from "reduxToolkit/features/userProfile/familySlice";
import {
  getUserFamilyApi,
  addUserFamilyApi,
  removeUserFamilyApi
} from "../../../apis/UserProfile/familyApi";
import { message } from "antd";
export default function* rewardSaga() {
  yield all([yield takeLatest(getFamily, fetchFamilySaga)]);
  yield all([yield takeLatest(addFamily, addFamilySaga)]);
  yield all([yield takeLatest(removeFamily, removeFamilySaga)]);
}

function* fetchFamilySaga(action) {
  try {
    const resp = yield call(getUserFamilyApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setFamily([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* addFamilySaga(action) {
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

function * removeFamilySaga(action){
  try {
    const resp = yield call(removeUserFamilyApi, action.payload);
    if(resp.message === "Success!. Deleted") {
      message.success("Xoá khen thưởng thành công")
      yield put(removeFamilySuccess(action.payload));
      
    } else {
      message.error("Xoá khen thưởng thất bại")
      yield put(removeFamilyFailed(action.payload));
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại")
  }
}
