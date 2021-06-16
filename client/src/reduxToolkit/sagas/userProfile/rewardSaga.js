import { all, call, takeLatest, put, select } from "redux-saga/effects";
import {
  getReward,
  setReward,
  addReward,
  addRewardSuccess,
  removeReward,
  removeRewardSuccess,
  removeRewardFailed,
  updateReward,
  updateRewardSuccess,
  updateRewardFailed,
} from "reduxToolkit/features/userProfile/rewardSlice";
import {
  removeDisciplineSuccess,
} from "reduxToolkit/features/userProfile/disciplineSlice";
import {
  getRewardApi,
  addRewardApi,
  removeRewardApi,
  updateRewardApi,
} from "apis/UserProfile/rewardApi";
import { message } from "antd";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
export default function* rewardSaga() {
  yield all([yield takeLatest(getReward, fetchRewardSaga)]);
  yield all([yield takeLatest(addReward, addRewardSaga)]);
  yield all([yield takeLatest(removeReward, removeRewardSaga)]);
  yield all([yield takeLatest(updateReward, updateRewardSaga)]);
}
const getProject = (state) => state.rewardUser

function* fetchRewardSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getRewardApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setReward([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
function* addRewardSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(addRewardApi, action.payload);
    if (resp.message === "Success!. Stored") {
      message.success("Thêm khen thưởng thành công");
    } else {
      message.error("Thêm khen thưởng thất bại");
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại");
  }
  yield put(hideLoading());
}
function* removeRewardSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeRewardApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá khen thưởng thành công");
      yield put(removeRewardSuccess(action.payload));
    } else {
      message.error("Xoá khen thưởng thất bại");
      yield put(removeRewardFailed(action.payload));
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại");
  }
  yield put(hideLoading());
}

function* updateRewardSaga(action){
  yield put(showLoading());
  try {
    const resp = yield call(updateRewardApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật khen thưởng thành công");
      let rewards = yield select(getProject);
      const existingReward = rewards.find((reward) => reward.id == action.payload.id);
      if(existingReward) {
        yield put(updateRewardSuccess(action.payload));
      } else {
            yield put (removeDisciplineSuccess(action.payload))
            yield put (addRewardSuccess(action.payload))
      }
    } else {
      message.error("Cập nhật khen thưởng thất bại");
      yield put(updateRewardFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
