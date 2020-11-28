import * as userWorkObjectConstants from "../constants/userWorkObjectConstant";
const fetchListUserWorkObject = (params = {}) =>{
    return {
        type: userWorkObjectConstants.FETCH_LIST_USER_WORK_OBJECT,
        payload: {
            params
        }
    }
}

const fetchListUserWorkObjectSuccess = data => {
    return {
        type: userWorkObjectConstants.FETCH_LIST_USER_WORK_OBJECT_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserWorkObjectFailed = error => {
    return {
        type: userWorkObjectConstants.FETCH_LIST_USER_WORK_OBJECT_FAILED,
        payload: {
            error
        }
    }
}

const deleteUserWorkObject = id => {
    return {
        type:userWorkObjectConstants.DELETE_USER_WORK_OBJECT,
        payload:{
            id
        }
    }
}

const deleteUserWorkObjectSuccess = data => {
    return {
        type: userWorkObjectConstants.DELETE_USER_WORK_OBJECT_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserWorkObjectFailed = error => {
    return {
        type: userWorkObjectConstants.DELETE_USER_WORK_OBJECT,
        payload: {
            error
        }
    }
}
const addUserWorkObject = data => {
    return {
        type: userWorkObjectConstants.ADD_USER_WORK_OBJECT,
        payload: {
            data
        }
    }
}
const addUserWorkObjectSuccess = data => {
    return {
        type: userWorkObjectConstants.ADD_USER_WORK_OBJECT_SUCCESS,
        payload: {
            data
        }
    }
}
const addUserWorkObjectFailed = error => {
    return {
        type: userWorkObjectConstants.ADD_USER_WORK_OBJECT_FAILED,
        payload: {
            error
        }
    }
}
const editUserWorkObject = user => {
    return {
        type:userWorkObjectConstants.EDIT_USER_WORK_OBJECT,
        payload:{
            user
        }
    }
}
export {
    fetchListUserWorkObject,
    fetchListUserWorkObjectSuccess,
    fetchListUserWorkObjectFailed,
    deleteUserWorkObject,
    deleteUserWorkObjectSuccess,
    deleteUserWorkObjectFailed,
    addUserWorkObject,
    addUserWorkObjectSuccess,
    addUserWorkObjectFailed,
    editUserWorkObject
}
