import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userTypes from '../constants/userConstant';
import { getListUser,deleteUser,addUser } from "../apis/userApi";
import { fetchListUserSuccess, fetchListUserFailed,
    deleteUserSuccess,deleteUserFailed,
    addUserSuccess, addUserFailed } from "../actions/userAction";
export default function* userSaga() {
    yield all([
        yield takeLatest(userTypes.FETCH_LIST_USER, watchFetchListUserAction),
        yield takeLatest(userTypes.DELETE_USER, deleteUserSaga),
        yield takeLatest(userTypes.ADD_USER, addUserSaga)
    ])
}
function* watchFetchListUserAction() {
    const resp = yield call(getListUser);
    if (resp.status === 200) {
        yield put(fetchListUserSuccess(resp.data));
    } else {
        yield put(fetchListUserFailed(resp.error))
    }
}

function* deleteUserSaga({payload}) {
    const resp = yield call(deleteUser, payload.id);
    if(resp.status === 200){
        yield put(deleteUserSuccess(payload.id));
    }
    else {
        yield put(deleteUserFailed(error))
    }
}

function* addUserSaga({payload}) {
    const resp = yield call (addUser,payload.data);
    if(resp.status === 201) {
        yield put (addUserSuccess(payload.data));
    } else {
        yield put(addUserFailed);
    }
}