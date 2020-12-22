import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userDepartmentTypes from '../constants/userDepartmentConstant';
import { getListUserDepartment,deleteUserDepartment,addUserDepartment } from "../apis/userDepartmentApi";
import { fetchListUserDepartmentSuccess, fetchListUserDepartmentFailed,
    deleteUserDepartmentSuccess,deleteUserDepartmentFailed,
    addUserDepartmentSuccess, addUserDepartmentFailed } from "../actions/userDepartmentAction";
export default function* userDepartmentSaga() {
    yield all([
        yield takeLatest(userDepartmentTypes.FETCH_LIST_USER_DEPARTMENT, watchFetchListUserDepartmentAction),
        yield takeLatest(userDepartmentTypes.DELETE_USER_DEPARTMENT, deleteUserDepartmentSaga),
        yield takeLatest(userDepartmentTypes.ADD_USER_DEPARTMENT, addUserDepartmentSaga)
    ])
}
function* watchFetchListUserDepartmentAction() {
    const resp = yield call(getListUserDepartment);
    if (resp.status === 200) {
        yield put(fetchListUserDepartmentSuccess(resp.data));
    } else {
        yield put(fetchListUserDepartmentFailed(resp.error))
    }
}

function* deleteUserDepartmentSaga({payload}) {
    const resp = yield call(deleteUserDepartment, payload.id);
    if(resp.status === 200){
        yield put(deleteUserDepartmentSuccess(payload.id));
    }
    else {
        yield put(deleteUserDepartmentFailed(error))
    }
}

function* addUserDepartmentSaga({payload}) {
    const resp = yield call (addUserDepartment,payload.data);
    if(resp.status === 201) {
        yield put (addUserDepartmentSuccess(payload.data));
    } else {
        yield put(addUserDepartmentFailed);
    }
}