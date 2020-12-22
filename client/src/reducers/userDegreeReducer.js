import * as userDegreeConstants from "../constants/userDegreeConstant";
import {message } from 'antd';
const initialState = {
    listUserDegree: [],
    userDegreeEditing: null,
}
const userDegreeReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDegreeConstants.FETCH_LIST_USER_DEGREE: {
            return {
                ...state,
                listUserDegree: []
            }
        }
        case userDegreeConstants.FETCH_LIST_USER_DEGREE_SUCCESS: {
            return {
                ...state,
                listUserDegree: action.payload.data,
            }
        }
        case userDegreeConstants.FETCH_LIST_USER_DEGREE_FAILED: {
            return {
                ...state,
                listUserDegree:[]
            }
        }
        case userDegreeConstants.DELETE_USER_DEGREE: {
            return {
                ...state
            }
        }
        case userDegreeConstants.DELETE_USER_DEGREE_SUCCESS: {
            message.success('Bạn đã xoá thành công');
            return {
                ...state,
                listUserDegree: state.listUserDegree.filter(item => item.id !==action.payload.data),
            }
        }
        case userDegreeConstants.DELETE_USER_DEGREE_FAILED: {
            return {
                ...state
            }
        }
        case userDegreeConstants.ADD_USER_DEGREE: {
            return {
                ...state
            }
        }
        case userDegreeConstants.ADD_USER_DEGREE_SUCCESS: {
            const { data } = action.payload
            return {
                ...state, listUserDegree: [...state.listUserDegree, data]
            }
        }
        case userDegreeConstants.ADD_USER_DEGREE_FAILED: {
            return {
                ...state
            }
        }
        case userDegreeConstants.EDIT_USER_DEGREE: {
            return {
                ...state,
                userDegreeEditing: action.payload.userDegree
            }
        }
        default:
            return initialState
    }
}
export default userDegreeReducer;