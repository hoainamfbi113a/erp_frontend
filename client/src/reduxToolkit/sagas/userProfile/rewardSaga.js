import { all, call, takeLatest, put } from "redux-saga/effects";
import { getReward, setReward, addReward,
   removeReward, removeRewardSuccess, removeRewardFailed,
   updateReward, updateRewardSuccess, updateRewardFailed
  } from "reduxToolkit/features/userProfile/rewardSlice";
import { getRewardApi, addRewardApi, removeRewardApi, updateRewardApi } from "apis/UserProfile/rewardApi"
import {
  message,
} from "antd";

export default function* rewardSaga() {
  yield all([yield takeLatest(getReward, fetchRewardSaga)]);
  yield all([yield takeLatest(addReward, addRewardSaga)]);
  yield all([yield takeLatest(removeReward, removeRewardSaga)]);
  yield all([yield takeLatest(updateReward, updateRewardSaga)])
}
function* fetchRewardSaga(action) {
  try {
    const resp = yield call(getRewardApi, action.payload);
    // console.log(action.payload)
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
    if(resp.message === "Success!. Deleted") {
      message.success("Xoá khen thưởng thành công")
      yield put(removeRewardSuccess(action.payload));
      
    } else {
      message.error("Xoá khen thưởng thất bại")
      yield put(removeRewardFailed(action.payload));
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại")
  }
}

function * updateRewardSaga (action) {
  try {
    const resp = yield call(updateRewardApi, action.payload);
    if(resp.message === "Success!. Updated") {
      message.success("Cập nhật khen thưởng thành công")
      yield put (updateRewardSuccess(action.payload))
    } else {
      message.error("Cập nhật khen thưởng thất bại")
      yield put (updateRewardFailed(action.payload))
    }
  } catch (error) {
    console.log(error)
  }
}