import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
function* fetchDataSaga(action) {
    yield put(showLoading());
    try {
      const resp = yield call(getRewardApi, action.payload);
      // console.log(action.payload)
      if (resp.message === "Successfully") {
        yield put(setReward([...resp.data]));
      }
    } catch (error) {
      console.log(error);
    }
    yield put(hideLoading());
  }