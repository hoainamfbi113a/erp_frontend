import * as userPersonalHistoryConstants from "../constants/userPersonalHistoryConstant";
const fetchListUserPersonalHistory = (params = {}) =>{
    return {
        type: userPersonalHistoryConstants.FETCH_LIST_USER_PERSONAL_HISTORY,
        payload: {
            params
        }
    }
}

const fetchListUserPersonalHistorySuccess = data => {
    return {
        type: userPersonalHistoryConstants.FETCH_LIST_USER_PERSONAL_HISTORY_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserPersonalHistoryFailed = error => {
    return {
        type: userPersonalHistoryConstants.FETCH_LIST_USER_PERSONAL_HISTORY_FAILED,
        payload: {
            error
        }
    }
}

const deleteUserPersonalHistory = id => {
    return {
        type:userPersonalHistoryConstants.DELETE_USER_PERSONAL_HISTORY,
        payload:{
            id
        }
    }
}

const deleteUserPersonalHistorySuccess = data => {
    return {
        type: userPersonalHistoryConstants.DELETE_USER_PERSONAL_HISTORY_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserPersonalHistoryFailed = error => {
    return {
        type: userPersonalHistoryConstants.DELETE_USER_PERSONAL_HISTORY,
        payload: {
            error
        }
    }
}
const addUserPersonalHistory = data => {
    return {
        type: userPersonalHistoryConstants.ADD_USER_PERSONAL_HISTORY,
        payload: {
            data
        }
    }
}
const addUserPersonalHistorySuccess = data => {
    return {
        type: userPersonalHistoryConstants.ADD_USER_PERSONAL_HISTORY_SUCCESS,
        payload: {
            data
        }
    }
}
const addUserPersonalHistoryFailed = error => {
    return {
        type: userPersonalHistoryConstants.ADD_USER_PERSONAL_HISTORY_FAILED,
        payload: {
            error
        }
    }
}
const editUserPersonalHistory = user => {
    return {
        type:userPersonalHistoryConstants.EDIT_USER_PERSONAL_HISTORY,
        payload:{
            user
        }
    }
}
export {
    fetchListUserPersonalHistory,
    fetchListUserPersonalHistorySuccess,
    fetchListUserPersonalHistoryFailed,
    deleteUserPersonalHistory,
    deleteUserPersonalHistorySuccess,
    deleteUserPersonalHistoryFailed,
    addUserPersonalHistory,
    addUserPersonalHistorySuccess,
    addUserPersonalHistoryFailed,
    editUserPersonalHistory
}
