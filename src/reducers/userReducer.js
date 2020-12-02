import * as userConstants from "../constants/userConstant";
import {message } from 'antd';
const initialState = {
    listUser: [],
    userEditing: null,
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.FETCH_LIST_USER: {
            return {
                ...state,
                listUser: []
            }
        }
        case userConstants.FETCH_LIST_USER_SUCCESS: {
            return {
                ...state,
                listUser: action.payload.data,
            }
        }
        case userConstants.FETCH_LIST_USER_FAILED: {
            return {
                ...state,
                listUser:[]
            }
        }
        case userConstants.DELETE_USER: {
            return {
                ...state
            }
        }
        case userConstants.DELETE_USER_SUCCESS: {
            message.success('Bạn đã xoá thành công');
            return {
                ...state,
                listUser: state.listUser.filter(item => item.id !==action.payload.data),
            }
        }
        case userConstants.DELETE_USER_FAILED: {
            return {
                ...state
            }
        }
        case userConstants.ADD_USER: {
            return {
                ...state
            }
        }
        case userConstants.ADD_USER_SUCCESS: {
            const { data } = action.payload
            return {
                ...state, listUser: [...state.listUser, data]
            }
        }
        case userConstants.ADD_USER_FAILED: {
            return {
                ...state
            }
        }
        case userConstants.EDIT_USER: {
            return {
                ...state,
                userEditing: action.payload.user
            }
        }
        default:
            return initialState
    }
}
export default userReducer;