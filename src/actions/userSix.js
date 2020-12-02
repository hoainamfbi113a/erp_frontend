import * as userSixConstants from "../constants/userSixConstant";
const fetchListUserSix = (params = {}) =>{
    return {
        type: userSixConstants.FETCH_LIST_USER_SIX,
        payload: {
            params
        }
    }
}

const fetchListUserSixSuccess = data => {
    return {
        type: userSixConstants.FETCH_LIST_USER_SIX_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserSixFailed = error => {
    return {
        type: userSixConstants.FETCH_LIST_USER_SIX_FAILED,
        payload: {
            error
        }
    }
}

const deleteUserSix = id => {
    return {
        type:userSixConstants.DELETE_USER_SIX,
        payload:{
            id
        }
    }
}

const deleteUserSixSuccess = data => {
    return {
        type: userSixConstants.DELETE_USER_SIX_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserSixFailed = error => {
    return {
        type: userSixConstants.DELETE_USER_SIX,
        payload: {
            error
        }
    }
}
const addUserSix = (profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history) => {
    return {
        type: userSixConstants.ADD_USER_SIX,
        payload: {
            profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history
        }
    }
}
const addUserSixSuccess = (profiles,departments,personal_histories,degrees,work_objects,journalist_cards) => {
    return {
        type: userSixConstants.ADD_USER_SIX_SUCCESS,
        payload: {
            profiles,departments,personal_histories,degrees,work_objects,journalist_cards
        }
    }
}
const addUserSixFailed = error => {
    return {
        type: userSixConstants.ADD_USER_SIX_FAILED,
        payload: {
            error
        }
    }
}
const editUserSix = (profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history) => {
    return {
        type:userSixConstants.EDIT_USER_SIX,
        payload:{
            profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history
        }
    }
}
const editUserSixSuccess = data =>{
    return {
        type:userSixConstants.EDIT_USER_SIX_SUCCESS,
        payload:{
            data
        }
    }
}
const editUserSixFailed = error => {
    return {
        type:userSixConstants.EDIT_USER_SIX_FAILED,
        payload:{
            error
        }
    }
}
export {
    fetchListUserSix,
    fetchListUserSixSuccess,
    fetchListUserSixFailed,
    deleteUserSix,
    deleteUserSixSuccess,
    deleteUserSixFailed,
    addUserSix,
    addUserSixSuccess,
    addUserSixFailed,
    editUserSix,
    editUserSixSuccess,
    editUserSixFailed
}
