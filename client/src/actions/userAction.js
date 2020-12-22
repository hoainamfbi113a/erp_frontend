import * as userConstants from "../constants/userConstant";
const fetchListUser = (params = {}) =>{
    return {
        type: userConstants.FETCH_LIST_USER,
        payload: {
            params
        }
    }
}

const fetchListUserSuccess = data => {
    return {
        type: userConstants.FETCH_LIST_USER_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserFailed = error => {
    return {
        type: userConstants.FETCH_LIST_USER_FAILED,
        payload: {
            error
        }
    }
}

const deleteUser = id => {
    return {
        type:userConstants.DELETE_USER,
        payload:{
            id
        }
    }
}

const deleteUserSuccess = data => {
    return {
        type: userConstants.DELETE_USER_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserFailed = error => {
    return {
        type: userConstants.DELETE_USER,
        payload: {
            error
        }
    }
}
const addUser = data => {
    return {
        type: userConstants.ADD_USER,
        payload: {
            data
        }
    }
}
const addUserSuccess = data => {
    return {
        type: userConstants.ADD_USER_SUCCESS,
        payload: {
            data
        }
    }
}
const addUserFailed = error => {
    return {
        type: userConstants.ADD_USER_FAILED,
        payload: {
            error
        }
    }
}
const editUser = user => {
    return {
        type:userConstants.EDIT_USER,
        payload:{
            user
        }
    }
}
export {
    fetchListUser,
    fetchListUserSuccess,
    fetchListUserFailed,
    deleteUser,
    deleteUserSuccess,
    deleteUserFailed,
    addUser,
    addUserSuccess,
    addUserFailed,
    editUser
}
