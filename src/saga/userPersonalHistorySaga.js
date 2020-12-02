import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userPersonalHistoryTypes from '../constants/userPersonalHistoryConstant';
import { getListUserPersonalHistory,deleteUserPersonalHistory,addUserPersonalHistory } from "../apis/userPersonalHistoryApi";
import { fetchListUserPersonalHistorySuccess, fetchListUserPersonalHistoryFailed,
    deleteUserPersonalHistorySuccess,deleteUserPersonalHistoryFailed,
    addUserPersonalHistorySuccess, addUserPersonalHistoryFailed } from "../actions/userPersonalHistoryAction";
export default function* userPersonalHistorySaga() {
    yield all([
        yield takeLatest(userPersonalHistoryTypes.FETCH_LIST_USER_PERSONAL_HISTORY, watchFetchListUserPersonalHistory),
        yield takeLatest(userPersonalHistoryTypes.DELETE_USER_PERSONAL_HISTORY, deleteUserPersonalHistorySaga),
        yield takeLatest(userPersonalHistoryTypes.ADD_USER_PERSONAL_HISTORY, addUserPersonalHistorySaga)
    ])
}
function* watchFetchListUserPersonalHistory() {
    const resp = yield call(getListUserPersonalHistory);
    if (resp.status === 200) {
        yield put(fetchListUserPersonalHistorySuccess(resp.data));
    } else {
        yield put(fetchListUserPersonalHistoryFailed(resp.error))
    }
}

function* deleteUserPersonalHistorySaga({payload}) {
    const resp = yield call(deleteUserPersonalHistory, payload.id);
    if(resp.status === 200){
        yield put(deleteUserPersonalHistorySuccess(payload.id));
    }
    else {
        yield put(deleteUserPersonalHistoryFailed(error))
    }
}

function* addUserPersonalHistorySaga({payload}) {
    const resp = yield call (addUserPersonalHistory,payload.data);
    if(resp.status === 201) {
        yield put (addUserPersonalHistorySuccess(payload.data));
    } else {
        yield put(addUserPersonalHistoryFailed);
    }
}