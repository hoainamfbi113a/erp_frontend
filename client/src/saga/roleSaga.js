import { func } from "prop-types";
import { all, call, takeLatest, put } from "redux-saga/effects";
import {getListRole} from "../apis/roleApi"
import * as roleTypes from "../constants/roleConstant";
import {fetchListRoleSuccess} from "../actions/roleAction";
export default function* roleSaga() {
    yield all([
        yield takeLatest(roleTypes.FETCH_LIST_ROLE, watchFetchListRole)
    ])
}
function* watchFetchListRole() {
    const resp = yield call(getListRole);
    if(resp.message === "Successfully"){
        yield put(fetchListRoleSuccess(resp.data));
    }
}