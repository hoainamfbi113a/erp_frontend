import * as userJournalistCardConstants from "../constants/userJournalistCardConstant";
const fetchListUserJournalistCard = (params = {}) =>{
    return {
        type: userJournalistCardConstants.FETCH_LIST_USER_JOURNALIST_CARD,
        payload: {
            params
        }
    }
}

const fetchListUserJournalistCardSuccess = data => {
    return {
        type: userJournalistCardConstants.FETCH_LIST_USER_JOURNALIST_CARD_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserJournalistCardFailed = error => {
    return {
        type: userJournalistCardConstants.FETCH_LIST_USER_JOURNALIST_CARD_FAILED,
        payload: {
            error
        }
    }
}

const deleteUserJournalistCard = id => {
    return {
        type:userJournalistCardConstants.DELETE_USER_JOURNALIST_CARD,
        payload:{
            id
        }
    }
}

const deleteUserJournalistCardSuccess = data => {
    return {
        type: userJournalistCardConstants.DELETE_USER_JOURNALIST_CARD_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserJournalistCardFailed = error => {
    return {
        type: userJournalistCardConstants.DELETE_USER_JOURNALIST_CARD,
        payload: {
            error
        }
    }
}
const addUserJournalistCard = data => {
    return {
        type: userJournalistCardConstants.ADD_USER_JOURNALIST_CARD,
        payload: {
            data
        }
    }
}
const addUserJournalistCardSuccess = data => {
    return {
        type: userJournalistCardConstants.ADD_USER_JOURNALIST_CARD_SUCCESS,
        payload: {
            data
        }
    }
}
const addUserJournalistCardFailed = error => {
    return {
        type: userJournalistCardConstants.ADD_USER_JOURNALIST_CARD_FAILED,
        payload: {
            error
        }
    }
}
const editUserJournalistCard = user => {
    return {
        type:userJournalistCardConstants.EDIT_USER_JOURNALIST_CARD,
        payload:{
            user
        }
    }
}
export {
    fetchListUserJournalistCard,
    fetchListUserJournalistCardSuccess,
    fetchListUserJournalistCardFailed,
    deleteUserJournalistCard,
    deleteUserJournalistCardSuccess,
    deleteUserJournalistCardFailed,
    addUserJournalistCard,
    addUserJournalistCardSuccess,
    addUserJournalistCardFailed,
    editUserJournalistCard
}
