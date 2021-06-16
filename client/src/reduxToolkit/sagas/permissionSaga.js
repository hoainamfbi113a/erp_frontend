import { all, call, takeLatest, put} from "redux-saga/effects";
import { setPermission, getPermission } from "../features/permissionSlice";
import { getPermissionUser } from "../../apis/authenticationApi";
export default function* permissionSaga() {
    yield all ([yield takeLatest(getPermission.type, fetchPermission)]);
}

function* fetchPermission (action) {
    try {
        const resp = yield call(getPermissionUser, action.payload);
        
        if(resp) {
            yield put(setPermission(Object.values(resp)))
        }
    } catch (error) {
        console.log(error)
    }
}
