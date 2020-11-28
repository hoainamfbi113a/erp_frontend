import { call, takeLatest, all, put} from 'redux-saga/effects';
import * as userDegreeTypes from '../constants/userDegreeConstant';
import { getListUserDegree,deleteUserDegree,addUserDegree } from "../apis/userDegreeApi";
import { fetchListUserDegreeSuccess, fetchListUserDegreeFailed,
    deleteUserDegreeSuccess,deleteUserDegreeFailed,
    addUserDegreeSuccess, addUserDegreeFailed } from "../actions/userDegreeAction";
export default function* userDegreeSaga() {
    yield all([
        yield takeLatest(userDegreeTypes.FETCH_LIST_USER_DEGREE, watchFetchListUserDegreeAction),
        yield takeLatest(userDegreeTypes.DELETE_USER_DEGREE, deleteUserDegreeSaga),
        yield takeLatest(userDegreeTypes.ADD_USER_DEGREE, addUserDegreeSaga)
    ])
}
function* watchFetchListUserDegreeAction() {
    const resp = yield call(getListUserDegree);
    if (resp.status === 200) {
        yield put(fetchListUserDegreeSuccess(resp.data));
    } else {
        yield put(fetchListUserDegreeFailed(resp.error))
    }
}

function* deleteUserDegreeSaga({payload}) {
    const resp = yield call(deleteUserDegree, payload.id);
    if(resp.status === 200){
        yield put(deleteUserDegreeSuccess(payload.id));
    }
    else {
        yield put(deleteUserDegreeFailed(error))
    }
}

function* addUserDegreeSaga({payload}) {
    const resp = yield call (addUserDegree,payload.data);
    if(resp.status === 201) {
        yield put (addUserDegreeSuccess(payload.data));
    } else {
        yield put(addUserDegreeFailed);
    }
}