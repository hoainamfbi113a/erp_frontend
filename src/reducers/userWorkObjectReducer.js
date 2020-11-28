import * as userWorkObjectConstants from "../constants/userWorkObjectConstant";
import {message } from 'antd';
const initialState = {
    listUserWorkObject: [],
    userWorkObjectEditing: null,
}
const userWorkObjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case userWorkObjectConstants.FETCH_LIST_USER_WORK_OBJECT: {
            return {
                ...state,
                listUserWorkObject: []
            }
        }
        case userWorkObjectConstants.FETCH_LIST_USER_WORK_OBJECT_SUCCESS: {
            return {
                ...state,
                listUserWorkObject: action.payload.data,
            }
        }
        case userWorkObjectConstants.FETCH_LIST_USER_WORK_OBJECT_FAILED: {
            return {
                ...state,
                listUserWorkObject:[]
            }
        }
        case userWorkObjectConstants.DELETE_USER_WORK_OBJECT: {
            return {
                ...state
            }
        }
        case userWorkObjectConstants.DELETE_USER_WORK_OBJECT_SUCCESS: {
            message.success('Bạn đã xoá thành công');
            return {
                ...state,
                listUserWorkObject: state.listUserWorkObject.filter(item => item.id !==action.payload.data),
            }
        }
        case userWorkObjectConstants.DELETE_USER_WORK_OBJECT_FAILED: {
            return {
                ...state
            }
        }
        case userWorkObjectConstants.ADD_USER_WORK_OBJECT: {
            return {
                ...state
            }
        }
        case userWorkObjectConstants.ADD_USER_WORK_OBJECT_SUCCESS: {
            const { data } = action.payload
            return {
                ...state, listUserWorkObject: [...state.listUserWorkObject, data]
            }
        }
        case userWorkObjectConstants.ADD_USER_WORK_OBJECT_FAILED: {
            return {
                ...state
            }
        }
        case userWorkObjectConstants.EDIT_USER_WORK_OBJECT: {
            return {
                ...state,
                userWorkObjectEditing: action.payload.userWorkObject
            }
        }
        default:
            return initialState
    }
}
export default userWorkObjectReducer;