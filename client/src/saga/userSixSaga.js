import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userSixTypes from '../constants/userSixConstant';
import { getListUserBase,deleteUserBase,addUserBase,editUserBase,editUserBaseGet } from "../apis/userBaseApi";
import { fetchListUserSixSuccess, fetchListUserSixFailed,
    deleteUserSixSuccess,deleteUserSixFailed,
    addUserSixSuccess, addUserSixFailed,editUserSixSuccess,editUserSixFailed,editUserSixGetSuccess } from "../actions/userSix";
import { showLoading, hideLoading } from "../actions/ui";
export default function* userSixSaga() {
    yield all([
        yield takeLatest(userSixTypes.FETCH_LIST_USER_SIX, watchFetchListUserSixAction),
        yield takeLatest(userSixTypes.DELETE_USER_SIX, deleteUserSixSaga),
    ])
}
function* watchFetchListUserSixAction() {
    yield put(showLoading())
    const resp = yield call(getListUserBase,1);
    if(resp.status === 200) {
        yield put(hideLoading());
        yield put(fetchListUserSixSuccess(resp.data.data));
    }
}

function* deleteUserSixSaga({payload}) {
    const resp1 = yield call(deleteUserBase, payload.id);
        if(resp1.status == 200){
        
        yield put(deleteUserSixSuccess(payload.id));
        
    }
    else {
        yield put(deleteUserSixFailed(error))
    }
}

