import * as userDepartmentConstants from "../constants/userDepartmentConstant";
const fetchListUserDepartment = (params = {}) =>{
    return {
        type: userDepartmentConstants.FETCH_LIST_USER_DEPARTMENT,
        payload: {
            params
        }
    }
}

const fetchListUserDepartmentSuccess = data => {
    return {
        type: userDepartmentConstants.FETCH_LIST_USER_DEPARTMENT_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserDepartmentFailed = error => {
    return {
        type: userDepartmentConstants.FETCH_LIST_USER_DEPARTMENT_FAILED,
        payload: {
            error
        }
    }
}

const deleteUserDepartment = id => {
    return {
        type:userDepartmentConstants.DELETE_USER_DEPARTMENT,
        payload:{
            id
        }
    }
}

const deleteUserDepartmentSuccess = data => {
    return {
        type: userDepartmentConstants.DELETE_USER_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserDepartmentFailed = error => {
    return {
        type: userDepartmentConstants.DELETE_USER_DEPARTMENT,
        payload: {
            error
        }
    }
}
const addUserDepartment = data => {
    return {
        type: userDepartmentConstants.ADD_USER_DEPARTMENT,
        payload: {
            data
        }
    }
}
const addUserDepartmentSuccess = data => {
    return {
        type: userDepartmentConstants.ADD_USER_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
}
const addUserDepartmentFailed = error => {
    return {
        type: userDepartmentConstants.ADD_USER_DEPARTMENT_FAILED,
        payload: {
            error
        }
    }
}
const editUserDepartment = user => {
    return {
        type:userDepartmentConstants.EDIT_USER_DEPARTMENT,
        payload:{
            user
        }
    }
}
export {
    fetchListUserDepartment,
    fetchListUserDepartmentSuccess,
    fetchListUserDepartmentFailed,
    deleteUserDepartment,
    deleteUserDepartmentSuccess,
    deleteUserDepartmentFailed,
    addUserDepartment,
    addUserDepartmentSuccess,
    addUserDepartmentFailed,
    editUserDepartment
}
