import * as roleConstant from "../constants/roleConstant";
const fetchListRole = (params = {}) =>{
    return {
        type:roleConstant.FETCH_LIST_ROLE,
        payload:{
            params
        }
    }
}
const fetchListRoleSuccess = (data) =>{
    return {
        type:roleConstant.FETCH_LIST_ROLE_SUCCESS,
        payload:{
            data,
        }
    }
}
const fetchListRoleFailed = (error) =>{
    return {
        type: roleConstant.FETCH_LIST_ROLE_FAILED
    }
}
export {
    fetchListRole,
    fetchListRoleSuccess,
    fetchListRoleFailed,
}