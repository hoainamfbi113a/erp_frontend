import { all, call, takeLatest, put } from "redux-saga/effects";
import { getReward, setReward } from "reduxToolkit/features/rewarddiscipline";
import { getRewardFamily } from "apis/UserProfile/rewardApi"
export default function* userSaga() {
  yield all([yield takeLatest(getReward, fetchReward)]);
}
function* fetchReward(action) {
  try {
    const resp = yield call(getRewardFamily, action.payload);
    if (resp.message === "Successfully") {
      yield put(setReward( [...resp.data ]));
    }
  } catch (error) {
    console.log(error);
  }
}
