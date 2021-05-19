import { all, call, takeLatest, put } from "redux-saga/effects";
import { getReward, setReward, addReward, removeReward } from "reduxToolkit/features/userProfile/rewardSlice";
import { getRewardApi, addRewardApi, removeRewardApi } from "apis/UserProfile/rewardApi"
import {
  message,
} from "antd";
export default function* rewardSaga() {
  yield all([yield takeLatest(getReward, fetchRewardSaga)]);
  yield all([yield takeLatest(addReward, addRewardSaga)]);
  yield all([yield takeLatest(removeReward, removeRewardSaga)]);
}
function* fetchRewardSaga(action) {
  try {
    const resp = yield call(getRewardApi, action.payload);
    console.log(action.payload)
    if (resp.message === "Successfully") {
      yield put(setReward([...resp.data ]));
    }
  } catch (error) {
    console.log(error);
  }
}
function * addRewardSaga(action) {
  try {
    const resp = yield call (addRewardApi, action.payload)
    if(resp.message === "Success!. Stored") {
      message.success("Thêm khen thưởng thành công")
    } else {
      message.error("Thêm khen thưởng thất bại")
    }

  } catch (error) {
    message.error("Thêm khen thưởng thất bại")
  }
}
function * removeRewardSaga(action){
  try {
    const resp = yield call(removeRewardApi, action.payload);
    console.log(action.payload)
    if(resp.message === "Success!. Stored") {
      message.success("Xoá khen thưởng thành công")
    } else {
      message.error("Xoá khen thưởng thất bại")
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại")
  }
}
