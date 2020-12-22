import * as userDegreeConstants from "../constants/userDegreeConstant";
const fetchListUserDegree = (params = {}) =>{
    return {
        type: userDegreeConstants.FETCH_LIST_USER_DEGREE,
        payload: {
            params
        }
    }
}

const fetchListUserDegreeSuccess = data => {
    return {
        type: userDegreeConstants.FETCH_LIST_USER_DEGREE_SUCCESS,
        payload : {
            data,
        }
    }
}

const fetchListUserDegreeFailed = error => {
    return {
        type: userDegreeConstants.FETCH_LIST_USER_DEGREE_FAILED,
        payload: {
            error
        }
    }
}

const deleteUserDegree = id => {
    return {
        type:userDegreeConstants.DELETE_USER_DEGREE,
        payload:{
            id
        }
    }
}

const deleteUserDegreeSuccess = data => {
    return {
        type: userDegreeConstants.DELETE_USER_DEGREE_SUCCESS,
        payload: {
            data
        }
    }
}

const deleteUserDegreeFailed = error => {
    return {
        type: userDegreeConstants.DELETE_USER_DEGREE,
        payload: {
            error
        }
    }
}
const addUserDegree = data => {
    return {
        type: userDegreeConstants.ADD_USER_DEGREE,
        payload: {
            data
        }
    }
}
const addUserDegreeSuccess = data => {
    return {
        type: userDegreeConstants.ADD_USER_DEGREE_SUCCESS,
        payload: {
            data
        }
    }
}
const addUserDegreeFailed = error => {
    return {
        type: userDegreeConstants.ADD_USER_DEGREE_FAILED,
        payload: {
            error
        }
    }
}
const editUserDegree = user => {
    return {
        type:userDegreeConstants.EDIT_USER_DEGREE,
        payload:{
            user
        }
    }
}
export {
    fetchListUserDegree,
    fetchListUserDegreeSuccess,
    fetchListUserDegreeFailed,
    deleteUserDegree,
    deleteUserDegreeSuccess,
    deleteUserDegreeFailed,
    addUserDegree,
    addUserDegreeSuccess,
    addUserDegreeFailed,
    editUserDegree
}
