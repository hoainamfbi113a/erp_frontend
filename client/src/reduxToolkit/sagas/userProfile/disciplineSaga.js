import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getDiscipline,
  setDiscipline,
  addDiscipline,
  removeDiscipline,
  removeDisciplineSuccess,
  removeDisciplineFailed,
  updateDiscipline,
  updateDisciplineSuccess,
  updateDisciplineFailed,
} from "reduxToolkit/features/userProfile/disciplineSlice";
import {
  getRewardApi,
  addRewardApi,
  removeRewardApi,
  updateRewardApi,
} from "apis/UserProfile/rewardApi";
import { message } from "antd";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
export default function* disciplineSaga() {
  yield all([yield takeLatest(getDiscipline, fetchDisciplineSaga)]);
  yield all([yield takeLatest(addDiscipline, addDisciplineSaga)]);
  yield all([yield takeLatest(removeDiscipline, removeDisciplineSaga)]);
  yield all([yield takeLatest(updateDiscipline, updateDisciplineSaga)]);
}
function* fetchDisciplineSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(getRewardApi, action.payload);
    // console.log(action.payload)
    if (resp.message === "Successfully") {
      yield put(setDiscipline([...resp.data]));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
function* addDisciplineSaga(action) {
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
function* removeDisciplineSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(removeRewardApi, action.payload);
    if (resp.message === "Success!. Deleted") {
      message.success("Xoá khen thưởng thành công");
      yield put(removeDisciplineSuccess(action.payload));
    } else {
      message.error("Xoá khen thưởng thất bại");
      yield put(removeDisciplineFailed(action.payload));
    }
  } catch (error) {
    message.error("Thêm khen thưởng thất bại");
  }
  yield put(hideLoading());
}

function* updateDisciplineSaga(action) {
  yield put(showLoading());
  try {
    const resp = yield call(updateRewardApi, action.payload);
    if (resp.message === "Success!. Updated") {
      message.success("Cập nhật khen thưởng thành công");
      yield put(updateDisciplineSuccess(action.payload));
    } else {
      message.error("Cập nhật khen thưởng thất bại");
      yield put(updateDisciplineFailed(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
