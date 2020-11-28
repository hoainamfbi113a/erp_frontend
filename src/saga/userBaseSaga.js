import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userBaseTypes from '../constants/userBaseConstant';
// import createHistory from 'history/createBrowserHistory';
// const history = createHistory();
import { getListUserBase,deleteUserBase,addUserBase,editUserBase } from "../apis/userBaseApi";
import { fetchListUserBaseSuccess, fetchListUserBaseFailed,
    deleteUserBaseSuccess,deleteUserBaseFailed,
    addUserBaseSuccess, addUserBaseFailed,editUserBaseSuccess,editUserBaseFailed } from "../actions/userBaseAction";
export default function* userBaseSaga() {
    yield all([
        yield takeLatest(userBaseTypes.FETCH_LIST_USER_BASE, watchFetchListUserBaseAction),
        yield takeLatest(userBaseTypes.DELETE_USER_BASE, deleteUserBaseSaga),
        yield takeLatest(userBaseTypes.ADD_USER_BASE, addUserBaseSaga),
        yield takeLatest(userBaseTypes.EDIT_USER_BASE, editUserBaseSaga)
    ])
}
function* watchFetchListUserBaseAction() {
    const resp = yield call(getListUserBase);
    if (resp.status === 200) {
        yield put(fetchListUserBaseSuccess(resp.data));
    } else {
        yield put(fetchListUserBaseFailed(resp.error))
    }
}

function* deleteUserBaseSaga({payload}) {
    const resp = yield call(deleteUserBase, payload.id);
    if(resp.status === 200){
        yield put(deleteUserBaseSuccess(payload.id));
    }
    else {
        yield put(deleteUserBaseFailed(error))
    }
}

function* addUserBaseSaga({payload}) {
    const resp = yield call (addUserBase,payload.data);
    if(resp.status === 201) {
        yield put (addUserBaseSuccess(payload.data));
        payload.history.push('/crm');
    } else {
        yield put(addUserBaseFailed);
    }
}
function* editUserBaseSaga({ payload }) {
    const resp = yield call(
      editUserBase,payload.data
    );
    console.log(resp);
    if (resp.status === 200) {
      yield put(editUserBaseSuccess(payload.data));
      payload.history.push('/crm');
    } else {
      yield put(editUserBaseFailed);
    }
  }