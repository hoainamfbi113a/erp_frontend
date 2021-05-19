import { all, call, takeLatest, put } from "redux-saga/effects";
import { getReward, setReward, addReward } from "reduxToolkit/features/rewarddiscipline";
import { getRewardApi, addRewardApi } from "apis/UserProfile/rewardApi"
export default function* rewardSaga() {
  yield all([yield takeLatest(getReward, fetchRewardSaga)]);
  yield all([yield takeLatest(addReward, addRewardSaga)]);
}
function* fetchRewardSaga(action) {
  try {
    const resp = yield call(getRewardApi, action.payload);
    if (resp.message === "Successfully") {
      yield put(setReward( [...resp.data ]));
    }
  } catch (error) {
    console.log(error);
  }
}
function * addRewardSaga(action) {
  try {
    const resp = yield call (addRewardApi, action.payload)
  } catch (error) {
    
  }
}
