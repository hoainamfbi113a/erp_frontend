import * as userDepartmentConstants from "../constants/userDepartmentConstant";
import {message } from 'antd';
const initialState = {
    listUserDepartment: [],
    userDepartmentEditing: null,
}
const userDepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDepartmentConstants.FETCH_LIST_USER_DEPARTMENT: {
            return {
                ...state,
                listUserDepartment: []
            }
        }
        case userDepartmentConstants.FETCH_LIST_USER_DEPARTMENT_SUCCESS: {
            return {
                ...state,
                listUserDepartment: action.payload.data,
            }
        }
        case userDepartmentConstants.FETCH_LIST_USER_DEPARTMENT_FAILED: {
            return {
                ...state,
                listUserDepartment:[]
            }
        }
        case userDepartmentConstants.DELETE_USER_DEPARTMENT: {
            return {
                ...state
            }
        }
        case userDepartmentConstants.DELETE_USER_DEPARTMENT_SUCCESS: {
            message.success('Bạn đã xoá thành công');
            return {
                ...state,
                listUserDepartment: state.listUserDepartment.filter(item => item.id !==action.payload.data),
            }
        }
        case userDepartmentConstants.DELETE_USER_DEPARTMENT_FAILED: {
            return {
                ...state
            }
        }
        case userDepartmentConstants.ADD_USER_DEPARTMENT: {
            return {
                ...state
            }
        }
        case userDepartmentConstants.ADD_USER_DEPARTMENT_SUCCESS: {
            const { data } = action.payload
            return {
                ...state, listUserDepartment: [...state.listUserDepartment, data]
            }
        }
        case userDepartmentConstants.ADD_USER_DEPARTMENT_FAILED: {
            return {
                ...state
            }
        }
        case userDepartmentConstants.EDIT_USER_DEPARTMENT: {
            return {
                ...state,
                userDepartmentEditing: action.payload.userDepartment
            }
        }
        default:
            return initialState
    }
}
export default userDepartmentReducer;