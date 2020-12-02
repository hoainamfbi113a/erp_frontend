import * as userBaseConstants from "../constants/userBaseConstant";
const fetchListUserBase = (params = {}) =>{
    return {
        type: userBaseConstants.FETCH_LIST_USER_BASE,
        payload: {
            params
        }
    }
}

const fetchListUserBaseSuccess = data => {
    return {
        type: userBaseConstants.FETCH_LIST_USER_BASE_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserBaseFailed = error => {
    return {
        type: userBaseConstants.FETCH_LIST_USER_BASE_FAILED,
        payload: {
            error
        }
    }
}

const deleteUserBase = id => {
    return {
        type:userBaseConstants.DELETE_USER_BASE,
        payload:{
            id
        }
    }
}

const deleteUserBaseSuccess = data => {
    return {
        type: userBaseConstants.DELETE_USER_BASE_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserBaseFailed = error => {
    return {
        type: userBaseConstants.DELETE_USER_BASE,
        payload: {
            error
        }
    }
}
const addUserBase = (data,history) => {
    return {
        type: userBaseConstants.ADD_USER_BASE,
        payload: {
            data,history
        }
    }
}
const addUserBaseSuccess = data => {
    return {
        type: userBaseConstants.ADD_USER_BASE_SUCCESS,
        payload: {
            data
        }
    }
}
const addUserBaseFailed = error => {
    return {
        type: userBaseConstants.ADD_USER_BASE_FAILED,
        payload: {
            error
        }
    }
}
const editUserBase = (data,history) => {
    return {
        type:userBaseConstants.EDIT_USER_BASE,
        payload:{
            data,
            history
        }
    }
}
const editUserBaseSuccess = data =>{
    return {
        type:userBaseConstants.EDIT_USER_BASE_SUCCESS,
        payload:{
            data
        }
    }
}
const editUserBaseFailed = error => {
    return {
        type:userBaseConstants.EDIT_USER_BASE_FAILED,
        payload:{
            error
        }
    }
}
export {
    fetchListUserBase,
    fetchListUserBaseSuccess,
    fetchListUserBaseFailed,
    deleteUserBase,
    deleteUserBaseSuccess,
    deleteUserBaseFailed,
    addUserBase,
    addUserBaseSuccess,
    addUserBaseFailed,
    editUserBase,
    editUserBaseSuccess,
    editUserBaseFailed
}
