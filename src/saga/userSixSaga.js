import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userSixTypes from '../constants/userSixConstant';
import { getListUserSix,deleteUserSix,addUserSix,editUserSix } from "../apis/userSixApi";
import { getListUserBase,deleteUserBase,addUserBase,editUserBase } from "../apis/userBaseApi";
import { getListUserDegree,deleteUserDegree,addUserDegree,editUserDegree } from "../apis/userDegreeApi";
import { getListUserDepartment,deleteUserDepartment,addUserDepartment,editUserDepartment } from "../apis/userDepartmentApi";
import { getListUserJournalistCard,deleteUserJournalistCard,addUserJournalistCard,editUserJournalistCard } from "../apis/userJournalistCardApi";
import { getListUserPersonalHistory,deleteUserPersonalHistory,addUserPersonalHistory,editUserPersonalHistory } from "../apis/userPersonalHistoryApi";
import { getListUserWorkObject,deleteUserWorkObject,addUserWorkObject,editUserWorkObject } from "../apis/userWorkObjectApi";
import { fetchListUserSixSuccess, fetchListUserSixFailed,
    deleteUserSixSuccess,deleteUserSixFailed,
    addUserSixSuccess, addUserSixFailed,editUserSixSuccess,editUserSixFailed } from "../actions/userSix";
import { showLoading, hideLoading } from "../actions/ui";
export default function* userSixSaga() {
    yield all([
        yield takeLatest(userSixTypes.FETCH_LIST_USER_SIX, watchFetchListUserSixAction),
        yield takeLatest(userSixTypes.DELETE_USER_SIX, deleteUserSixSaga),
        yield takeLatest(userSixTypes.ADD_USER_SIX, addUserSixSaga),
        yield takeLatest(userSixTypes.EDIT_USER_SIX, editUserSixSaga)
    ])
}
function* watchFetchListUserSixAction() {
    yield put(showLoading())
    const resp1 = yield call(getListUserBase);
    const resp2 = yield call(getListUserDegree);
    const resp3 = yield call(getListUserDepartment);
    const resp4 = yield call(getListUserJournalistCard);
    const resp5 = yield call(getListUserPersonalHistory);
    const resp6 = yield call(getListUserWorkObject);
    let resptemp = resp1.data.map((item, index) => {
        let payedOrder1 = resp2.data.find(o => o.userId == item.id);
        let payedOrder2= resp3.data.find(o => o.userId == item.id);
        let payedOrder3 = resp4.data.find(o => o.userId == item.id);
        let payedOrder4 = resp5.data.find(o => o.userId == item.id);
        let payedOrder5 = resp6.data.find(o => o.userId == item.id);
        return Object.assign({},{id:item.id}, {profiles:item},{degree: payedOrder1},{department: payedOrder2},{journalistCard:payedOrder3}
            ,{personalHistory:payedOrder4},{workObject: payedOrder5}
            )
        });
    console.log(resptemp);
    if (resp1.status === 200 && resp2.status === 200 && 
        resp3.status === 200 && resp4.status === 200 && 
        resp5.status === 200 && resp6.status === 200) {
        yield delay(1000)
        yield put(hideLoading());
        yield put(fetchListUserSixSuccess(resptemp));
    } else {
        yield put(fetchListUserSixFailed(resptemp))
    }
}

function* deleteUserSixSaga({payload}) {
    // yield put(showLoading())
    alert(payload.id)
    const resp1 = yield call(deleteUserBase, payload.id);
    // const resp2 = yield call(deleteUserDegree, payload.id);
    // const resp3 = yield call(deleteUserDepartment, payload.id);
    // const resp4 = yield call(deleteUserJournalistCard, payload.id);
    // const resp5 = yield call(deleteUserPersonalHistory, payload.id);
    // const resp6 = yield call(deleteUserWorkObject, payload.id);
    // if (resp1.status === 200 && resp2.status === 200 && 
    //     resp3.status === 200 && resp4.status === 200 && 
    //     resp5.status === 200 && resp6.status === 200) {
        
        if(resp1.status == 200){
        
        yield put(deleteUserSixSuccess(payload.id));
        yield delay(1000)
        
    }
    else {
        yield put(deleteUserSixFailed(error))
    }
}

function* addUserSixSaga({payload}) {
    yield put(showLoading())
    const {profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history} = payload
    console.log(payload)
    const resp1 = yield call (addUserBase,payload.profiles);
    const resp2 = yield call (addUserDepartment,payload.departments);
    const resp3 = yield call (addUserPersonalHistory,payload.personal_histories);
    yield delay(100);
    const resp4 = yield call (addUserDegree,payload.degrees);
    const resp5 = yield call (addUserWorkObject,payload.work_objects);
    const resp6 = yield call (addUserJournalistCard,payload.journalist_cards);
    if (resp1.status === 201 && resp2.status === 201 && 
        resp3.status === 201 && resp4.status === 201 && 
        resp5.status === 201 && resp6.status === 201) {
        yield delay(1000)
        yield put(hideLoading());
        yield put (addUserSixSuccess(profiles,departments,personal_histories,degrees,work_objects,journalist_cards));
        history.push('/crm/usersix');
    } else {
        yield put(addUserSixFailed);
    }
}
function* editUserSixSaga({ payload }) {
    yield put(showLoading())
    let {profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history} =payload;
    console.log(payload);
    const resp1 = yield call (editUserBase,profiles);
    const resp2 = yield call (editUserDepartment,departments);
    const resp3 = yield call (editUserPersonalHistory,personal_histories);
    const resp4 = yield call (editUserDegree,degrees);
    const resp5 = yield call (editUserWorkObject,work_objects);
    const resp6 = yield call (editUserJournalistCard,journalist_cards);
    if (resp1.status === 200 && resp2.status === 200 && 
        resp3.status === 200 && resp4.status === 200 && 
        resp5.status === 200 && resp6.status === 200) {
      history.push('/crm/usersix');
    } else {
      yield put(editUserSixFailed);
    }
  }