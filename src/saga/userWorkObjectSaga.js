import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userWorkObjectTypes from '../constants/userWorkObjectConstant';
import { getListUserWorkObject,deleteUserWorkObject,addUserWorkObject } from "../apis/userWorkObjectApi";
import { fetchListUserWorkObjectSuccess, fetchListUserWorkObjectFailed,
    deleteUserWorkObjectSuccess,deleteUserWorkObjectFailed,
    addUserWorkObjectSuccess, addUserWorkObjectFailed } from "../actions/userWorkObjectAction";
export default function* userWorkObjectSaga() {
    yield all([
        yield takeLatest(userWorkObjectTypes.FETCH_LIST_USER_WORK_OBJECT, watchFetchListUserWorkObjectAction),
        yield takeLatest(userWorkObjectTypes.DELETE_USER_WORK_OBJECT, deleteUserWorkObjectSaga),
        yield takeLatest(userWorkObjectTypes.ADD_USER_WORK_OBJECT, addUserWorkObjectSaga)
    ])
}
function* watchFetchListUserWorkObjectAction() {
    const resp = yield call(getListUserWorkObject);
    if (resp.status === 200) {
        yield put(fetchListUserWorkObjectSuccess(resp.data));
    } else {
        yield put(fetchListUserWorkObjectFailed(resp.error))
    }
}

function* deleteUserWorkObjectSaga({payload}) {
    const resp = yield call(deleteUserWorkObject, payload.id);
    if(resp.status === 200){
        yield put(deleteUserWorkObjectSuccess(payload.id));
    }
    else {
        yield put(deleteUserWorkObjectFailed(error))
    }
}

function* addUserWorkObjectSaga({payload}) {
    const resp = yield call (addUserWorkObject,payload.data);
    if(resp.status === 201) {
        yield put (addUserWorkObjectSuccess(payload.data));
    } else {
        yield put(addUserWorkObjectFailed);
    }
}