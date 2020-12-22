import { call, takeLatest, all, put, select,fork,delay,take } from 'redux-saga/effects';
import * as userJournalistCardTypes from '../constants/userJournalistCardConstant';
import { getListUserJournalistCard,deleteUserJournalistCard,addUserJournalistCard } from "../apis/userJournalistCardApi";
import { fetchListUserJournalistCardSuccess, fetchListUserJournalistCardFailed,
    deleteUserJournalistCardSuccess,deleteUserJournalistCardFailed,
    addUserJournalistCardSuccess, addUserJournalistCardFailed } from "../actions/userJournalistCardAction";
export default function* userJournalistCardSaga() {
    yield all([
        yield takeLatest(userJournalistCardTypes.FETCH_LIST_USER_JOURNALIST_CARD, watchFetchListUserJournalistCardAction),
        yield takeLatest(userJournalistCardTypes.DELETE_USER_JOURNALIST_CARD, deleteUserJournalistCardSaga),
        yield takeLatest(userJournalistCardTypes.ADD_USER_JOURNALIST_CARD, addUserJournalistCardSaga)
    ])
}
function* watchFetchListUserJournalistCardAction() {
    const resp = yield call(getListUserJournalistCard);
    if (resp.status === 200) {
        yield put(fetchListUserJournalistCardSuccess(resp.data));
    } else {
        yield put(fetchListUserJournalistCardFailed(resp.error))
    }
}

function* deleteUserJournalistCardSaga({payload}) {
    const resp = yield call(deleteUserJournalistCard, payload.id);
    if(resp.status === 200){
        yield put(deleteUserJournalistCardSuccess(payload.id));
    }
    else {
        yield put(deleteUserJournalistCardFailed(error))
    }
}

function* addUserJournalistCardSaga({payload}) {
    const resp = yield call (addUserJournalistCard,payload.data);
    if(resp.status === 201) {
        yield put (addUserJournalistCardSuccess(payload.data));
    } else {
        yield put(addUserJournalistCardFailed);
    }
}